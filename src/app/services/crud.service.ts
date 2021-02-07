import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseDto } from '../models/dtos/base-dto';
import { ListQuery } from '../models/list-query';
import { HttpParams, HttpResponse } from '@angular/common/http';
import { ListResponse } from '../models/responses/list-response';

@Injectable({
  providedIn: 'root',
})
export class CrudService<TDto extends BaseDto> {
  protected basePath: string;
  protected port: string;

  constructor(protected httpService: HttpService) {}

  async getList(request?: ListQuery): Promise<ListResponse<TDto>> {
    if (!request) {
      request = { page: 0 } as ListQuery;
    }
    let params = new HttpParams()
      .append('page', `${request.page}`);

    if (request.query) {
      params = params.append('query', request.query);
    }

    if (request.sortColumn) {
      params = params.append('sortColumn', request.sortColumn)
        .append('sortDirection', request.sortDirection);
    }

    const result = await this.httpService.get<ListResponse<TDto>>(`${this.basePath}`, true, params, this.port);
    if (result.ok) {
      return {
        ok: true,
        status: result.status,
        page: result.body.page,
        totalPages: result.body.totalPages,
        pageSize: result.body.pageSize,
        count: result.body.count,
        data: result.body.data
      };
    }

    return {
      ok: false,
      status: result.status,
      count: 0,
      data: []
    } as ListResponse<TDto>;
  }

  async get(id: string): Promise<HttpResponse<TDto>> {
    return await this.httpService.get(`${this.basePath}/${id}`, true, new HttpParams(), this.port);
  }

  async delete(id: string): Promise<HttpResponse<TDto>> {
    return await this.httpService.delete(`${this.basePath}/${id}`, true, this.port);
  }

  async create(request: TDto): Promise<HttpResponse<TDto>> {
    return await this.httpService.postAsJson(`${this.basePath}`, request, true, this.port);
  }

  async edit(request: TDto): Promise<HttpResponse<any>> {
    return await this.httpService.putAsJson(`${this.basePath}/${request.id}`, request, true, this.port);
  }
}
