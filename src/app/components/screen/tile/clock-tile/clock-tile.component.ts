import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ClockConfig } from 'src/app/models/tile-configs/clock-config';
import { TileDto } from 'src/app/models/dtos/tile-dto';
import { BaseTile } from '../base-tile';
import { timer } from 'rxjs';

@Component({
  selector: 'app-clock-tile',
  templateUrl: './clock-tile.component.html',
  styleUrls: ['./clock-tile.component.sass']
})
export class ClockTileComponent extends BaseTile<ClockConfig> {
  date: Date;

  constructor() {
    super();
  }

  initialize(): void {
    const sub = timer(0, 1000).subscribe(x => {
      this.date = new Date();
    });
    this.subscriptions.push(sub);
  }
}
