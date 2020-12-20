import { Component, OnInit } from '@angular/core';
import { WeatherDto } from 'src/app/models/dtos/weather-dto';
import { WeatherConfig } from 'src/app/models/tile-configs/weather-config';
import { WeatherService } from 'src/app/services/weather.service';
import { BaseTile } from '../base-tile';

@Component({
  selector: 'app-weather-tile',
  templateUrl: './weather-tile.component.html',
  styleUrls: ['./weather-tile.component.sass']
})
export class WeatherTileComponent extends BaseTile<WeatherConfig> {
  data: WeatherDto;

  constructor(
    private weatherService: WeatherService
  ) {
    super();
  }

  initialize(): void {
    this.weatherService.get(this.configuration.zip).then(response => {
      if (response.ok) {
        this.data = response.body;
      }
    });
  }
}
