import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Line } from 'src/app/models/line';
import { Point } from 'src/app/models/point';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.sass'],
})
export class AreaComponent implements AfterViewInit {
  points: Point[] = [];
  lines: Line[] = [];

  possibilities: Point[] = [];

  open = false;
  nextLength = -1;
  curAngle = 0;
  angles = [Math.PI / 4, Math.PI / 6, Math.PI / 8, Math.PI / 16];
  width = 0;
  height = 0;
  scale = 0; // pixels / ft
  verticalOffset = 300;
  padding = 20;
  prompt = 'How wide is the plot of land in feet?';
  showForm = true;
  angleText = '45.00';

  control: FormControl;
  canvas: CanvasRenderingContext2D;

  @ViewChild('container') container: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvasRef: ElementRef<HTMLCanvasElement>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.control = this.formBuilder.control('');
  }

  ngAfterViewInit(): void {
    this.onResize();
    this.cdRef.detectChanges();

    this.canvas = this.canvasRef.nativeElement.getContext('2d');
  }

  onClick(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const x = event.x - rect.left;
    const y = event.y - rect.top;
    const point = { x, y } as Point;
    const previous = this.points[this.points.length - 1];
    if (this.open) {
      if (this.nextLength === -1) {
        this.points.push(point);
        this.nextLength = -2;
        this.getNextDistance();
      } else {
        for (const p of this.possibilities) {
          if (this.distance(p.x, p.y, x, y) < 8) {
            this.points.push(p);
            this.lines.push({
              a: p,
              b: previous,
              highlight: false,
              length:
                this.distance(p.x, p.y, previous.x, previous.y) / this.scale,
            });
            this.possibilities = [];
            this.nextLength = -2;
            const first = this.points[0];
            if (!this.isEqual(p, first)) {
              this.getNextDistance();
            } else {
              this.doArea();
            }
            break;
          }
        }
      }
    }
    this.paint();
  }

  onResize() {
    this.height = window.innerHeight - this.verticalOffset;
    this.width = this.container.nativeElement.offsetWidth;
  }

  onSubmit() {
    if (!this.control.valid) {
      return;
    }

    if (this.scale === 0) {
      if (this.width > this.height) {
        this.scale = this.canvas.canvas.width / this.width;
      } else {
        this.scale = this.canvas.canvas.height / this.height;
      }

      this.prompt = 'Click to add the first point of the house.';
      this.showForm = false;
      this.open = true;
    } else {
      const input = this.control.value as number;
      this.nextLength = input * this.scale;
      this.showForm = false;
      this.open = true;
      this.prompt = 'Click the grey dot representing the endpoint of the wall.';
      const x = this.points[this.points.length - 1].x;
      const y = this.points[this.points.length - 1].y;
      this.buildPossibilities(x, y);
      this.paint();
    }
  }

  undo() {
    if (this.nextLength > 0) {
      this.nextLength = -2;
      this.possibilities = [];
      this.paint();
      this.getNextDistance();
    } else if (this.points.length === 1) {
      this.points = [];
      this.lines = [];
      this.showForm = false;
      this.prompt = 'Click to add the first point of the house.';
      this.open = true;
      this.nextLength = -1;
    } else if (this.points.length > 1) {
      this.points.pop();
      this.lines.pop();
      this.nextLength = -2;
      this.possibilities = [];
      this.getNextDistance();
    }
    this.paint();
  }

  zoomFit() {
    if (!this.open) {
      const max = { x: 0, y: 0 } as Point;
      const min = {
        x: this.canvas.canvas.width,
        y: this.canvas.canvas.height,
      } as Point;
      for (const point of this.points) {
        if (point.x < min.x) {
          min.x = point.x;
        }
        if (point.y < min.y) {
          min.y = point.y;
        }
        if (point.x > max.x) {
          max.x = point.x;
        }
        if (point.y > max.y) {
          max.y = point.y;
        }
      }
      const offset = {
        x: min.x - this.padding,
        y: min.y - this.padding,
      } as Point;
      for (const point of this.points) {
        point.x -= offset.x;
        point.y -= offset.y;
      }
      min.x = this.padding;
      min.y = this.padding;
      max.x -= offset.x;
      max.y -= offset.y;
      const dx = this.canvas.canvas.width - this.padding - max.x;
      const dy = this.canvas.canvas.height - this.padding - max.y;
      let s = 1;
      if (dx < dy) {
        s = (this.canvas.canvas.width - this.padding) / max.x;
      } else {
        s = (this.canvas.canvas.height - this.padding) / max.y;
      }
      for (const point of this.points) {
        point.x = (point.x - this.padding) * s + this.padding;
        point.y = (point.y - this.padding) * s + this.padding;
      }
      this.scale *= s;
      console.log(this.scale);
      this.paint();
    }
  }

  getNextDistance() {
    this.showForm = true;
    this.prompt =
      'How long in feet is the first wall extending from this point in feet?';
    this.control.setValue('');
  }

  changeAngle() {
    this.curAngle++;
    if (this.curAngle >= this.angles.length) {
      this.curAngle = 0;
    }

    const a = (this.angles[this.curAngle] * 180.0) / Math.PI;
    this.angleText = a.toFixed(2);
    if (this.nextLength > 0) {
      this.possibilities = [];
      this.buildPossibilities();
      this.paint();
    }
  }

  buildPossibilities(x?: number, y?: number) {
    if (x == null || y == null) {
      x = this.points[this.points.length - 1].x;
      y = this.points[this.points.length - 1].y;
    }

    const cos = [1];
    const sin = [0];
    this.possibilities = [];
    let angle = this.angles[this.curAngle];
    while (angle < 2 * Math.PI) {
      cos.push(Math.cos(angle));
      sin.push(Math.sin(angle));
      angle += this.angles[this.curAngle];
    }
    for (let i = 0; i < cos.length; i++) {
      this.possibilities.push({
        x: x + this.nextLength * cos[i],
        y: y + this.nextLength * sin[i],
      });
    }
  }

  paint() {
    this.canvas.clearRect(
      0,
      0,
      this.canvas.canvas.width,
      this.canvas.canvas.height
    );
    for (const point of this.points) {
      this.paintPoint(point, '#000', 2);
    }
    for (const possibility of this.possibilities) {
      this.paintPoint(possibility, '#555', 4);
    }
    for (const line of this.lines) {
      this.paintLine(line);
    }
  }

  paintPoint(a: Point, stroke: string, radius: number) {
    this.canvas.fillStyle = stroke;
    this.canvas.beginPath();
    this.canvas.arc(a.x, a.y, radius, 0, 2 * Math.PI);
    this.canvas.closePath();
    this.canvas.fill();
  }

  paintLine(line: Line) {
    const a = line.a;
    const b = line.b;
    if (line.highlight) {
      this.canvas.strokeStyle = '#FF0000';
    } else {
      this.canvas.strokeStyle = '#000000';
    }
    this.canvas.beginPath();
    this.canvas.moveTo(a.x, a.y);
    this.canvas.lineTo(b.x, b.y);
    this.canvas.closePath();
    this.canvas.stroke();
    const x = (a.x + b.x) / 2 + 5;
    const y = (a.y + b.y) / 2;
    this.canvas.fillText(line.length.toFixed(2) + ' ft', x, y);
  }

  doArea() {
    // sum of y_avg * dx = area
    this.open = false;
    let area = 0.0;
    console.log(this.scale);
    for (let i = 0; i < this.points.length - 1; i++) {
      area += this.dArea(this.points[i], this.points[i + 1]);
    }
    area += this.dArea(this.points[this.points.length - 1], this.points[0]);
    area = Math.abs(area);
    this.prompt =
      'The total area of the building is ' +
      area.toFixed(2) +
      ' sq ft. You can right-click on the image above to save it.';
  }

  dArea(a: Point, b: Point) {
    const yAvg = (a.y + b.y) / 2;
    const dx = a.x - b.x;
    return (yAvg * dx) / this.scale / this.scale;
  }

  distance(x1: number, y1: number, x2: number, y2: number) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
  }

  isEqual(a, b) {
    return this.distance(a.x, a.y, b.x, b.y) < this.scale;
  }
}
