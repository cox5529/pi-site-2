import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TileDto } from 'src/app/models/dtos/tile-dto';
import { TileTypes } from 'src/app/models/enums/tile-types';

@Component({
  selector: 'app-tile-container',
  templateUrl: './tile-container.component.html',
  styleUrls: ['./tile-container.component.sass']
})
export class TileContainerComponent implements OnInit, OnChanges {
  @Input() tile: TileDto;
  @Input() open = false;
  type: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tile) {
      this.type = TileTypes[TileTypes[this.tile.type]];
    }
  }
}
