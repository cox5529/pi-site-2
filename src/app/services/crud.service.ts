import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseDto } from '../models/dtos/base-dto';
import { ODataQuery } from '../models/odata-query';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { ODataResponse } from '../models/responses/odata-response';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudService<TDto extends BaseDto> {
  protected basePath: string;

  constructor(protected httpService: HttpService) {}

  async getList(request?: ODataQuery): Promise<ODataResponse<TDto>> {
    let params = new HttpParams();
    params = params.set('$count', 'true');

    if (request) {
      this.parseParameters(request);
      if (request.expand) {
        params = params.set('$expand', request.expand);
      }

      if (request.filter) {
        params = params.set('$filter', request.filter);
      }

      if (request.orderBy) {
        params = params.set('$orderBy', request.orderBy);
      }

      if (request.skip) {
        params = params.set('$skip', `${request.skip}`);
      }

      if (request.skip) {
        params = params.set('$top', `${request.top}`);
      }
    }

    const result = await this.httpService.get<ODataResponse<TDto>>(`${this.basePath}`, true, params);
    if (result.ok) {
      return {
        ok: true,
        statusCode: result.status,
        '@odata.count': result.body['@odata.count'],
        value: result.body.value
      };
    }

    return {
      ok: false,
      statusCode: result.status,
      '@odata.count': 0,
      value: []
    } as ODataResponse<TDto>;
  }

  abstract parseParameters(request: ODataQuery);
}
