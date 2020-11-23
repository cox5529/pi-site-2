import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ScreenDto } from '../models/dtos/screen-dto';
import { ListQuery } from '../models/list-query';
import { HttpService } from './http.service';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { ListResponse } from '../models/responses/list-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScreenService extends CrudService<ScreenDto> {

  constructor(httpService: HttpService) {
    super(httpService);
    super.basePath = '/api/screen';
    super.port = environment.screenServicePort;
  }
}
