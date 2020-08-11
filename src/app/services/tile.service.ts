import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { TileDto } from '../models/dtos/tile-dto';
import { ODataQuery } from '../models/odata-query';
import { HttpService } from './http.service';
import { Locations } from '../models/enums/locations';
import { TileTypes } from '../models/enums/tile-types';

@Injectable({
  providedIn: 'root'
})
export class TileService extends CrudService<TileDto> {

  constructor(httpService: HttpService) {
    super(httpService);
    super.basePath = '/api/tile';
  }

  getLocations(): string[] {
    return Object.keys(Locations).filter(key => !isNaN(Number(Locations[key])));
  }

  getTypes(): string[] {
    return Object.keys(TileTypes).filter(key => !isNaN(Number(TileTypes[key])));
  }

  parseParameters(request: ODataQuery) {
    throw new Error('Method not implemented.');
  }
}
