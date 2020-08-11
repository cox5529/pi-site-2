import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ScreenDto } from '../models/dtos/screen-dto';
import { ODataQuery } from '../models/odata-query';
import { HttpService } from './http.service';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { ODataResponse } from '../models/responses/odata-response';

@Injectable({
  providedIn: 'root'
})
export class ScreenService extends CrudService<ScreenDto> {

  constructor(httpService: HttpService) {
    super(httpService);
    super.basePath = '/api/screen';
  }

  async get(id: string): Promise<HttpResponse<ODataResponse<ScreenDto>>> {
    let params = new HttpParams();
    params = params.set('$expand', 'Tiles');
    return await this.httpService.get(`${this.basePath}(${id})`, true, params);
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
