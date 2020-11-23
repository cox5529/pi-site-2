import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { TileDto } from '../models/dtos/tile-dto';
import { ListQuery } from '../models/list-query';
import { HttpService } from './http.service';
import { Locations } from '../models/enums/locations';
import { TileTypes } from '../models/enums/tile-types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TileService extends CrudService<TileDto> {

  constructor(httpService: HttpService) {
    super(httpService);
    super.basePath = '/api/tile';
    super.port = environment.screenServicePort;
  }

  getLocations(): string[] {
    return Object.keys(Locations).filter(key => !isNaN(Number(Locations[key])));
  }

  getTypes(): string[] {
    return Object.keys(TileTypes).filter(key => !isNaN(Number(TileTypes[key])));
  }
}
