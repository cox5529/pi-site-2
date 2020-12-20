import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WeatherDto } from '../models/dtos/weather-dto';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private httpService: HttpService
  ) { }

  async get(zip: number): Promise<HttpResponse<WeatherDto>> {
    return await this.httpService.get(`/api/weather/${zip}`, true, null, environment.screenServicePort);
  }
}
