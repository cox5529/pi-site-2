import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { ListDto } from '../models/dtos/list-dto';

@Injectable({
  providedIn: 'root'
})
export class ListService extends CrudService<ListDto> {

  constructor(httpService: HttpService) {
    super(httpService);
    super.basePath = '/api/list';
    super.port = environment.screenServicePort;
  }
}
