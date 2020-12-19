import { Component, OnInit } from '@angular/core';
import { WeatherConfig } from 'src/app/models/tile-configs/weather-config';
import { BaseTile } from '../base-tile';

@Component({
  selector: 'app-weather-tile',
  templateUrl: './weather-tile.component.html',
  styleUrls: ['./weather-tile.component.sass']
})
export class WeatherTileComponent extends BaseTile<WeatherConfig> {

  constructor() {
    super();
  }

  initialize(): void {
    throw new Error('Method not implemented.');
  }
}
