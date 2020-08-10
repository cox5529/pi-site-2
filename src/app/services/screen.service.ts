import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ScreenDto } from '../models/dtos/screen-dto';
import { ODataQuery } from '../models/odata-query';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ScreenService extends CrudService<ScreenDto> {

  constructor(httpService: HttpService) {
    super(httpService);
    super.basePath = '/api/screen';
  }

  parseParameters(request: ODataQuery) {
    if (request.filterInput) {
      const lower = request.filterInput.toLowerCase();
      request.filter = `contains(name.toLower(), '${lower}')`;
    }

    if (request.sortColumn) {
      if (!request.sortDirection) {
        request.sortDirection = 'asc';
      }

      request.orderBy = `${request.sortColumn} ${request.sortDirection}`;
    }
  }
}
