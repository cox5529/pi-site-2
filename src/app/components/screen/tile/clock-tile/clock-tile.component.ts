import { Component, OnInit } from '@angular/core';
import { TileComponent } from '../tile.component';
import { ClockConfig } from 'src/app/models/tile-configs/clock-config';
import { TileDto } from 'src/app/models/dtos/tile-dto';

@Component({
  selector: 'app-clock-tile',
  templateUrl: './clock-tile.component.html',
  styleUrls: ['./clock-tile.component.sass']
})
export class ClockTileComponent extends TileComponent implements OnInit {
  configuration: ClockConfig;

  constructor(data: TileDto) {
    super();
    super.data = data;
    this.configuration = JSON.parse(data.configurationJson) as ClockConfig;
  }

  ngOnInit(): void {
  }

}
