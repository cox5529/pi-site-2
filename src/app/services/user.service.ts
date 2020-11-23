import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { UserDto } from '../models/dtos/user-dto';
import { HttpService } from './http.service';
import { ListQuery } from '../models/list-query';
import { Roles } from '../models/enums/roles';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<UserDto> {

  constructor(httpService: HttpService) {
    super(httpService);
    super.basePath = '/api/users';
    super.port = environment.authServicePort;
  }

  getRoleOptions(): string[] {
    return Object.keys(Roles).filter(key => !isNaN(Number(Roles[key])));
  }
}
