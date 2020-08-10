import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { UserDto } from '../models/dtos/user-dto';
import { HttpService } from './http.service';
import { ODataQuery } from '../models/odata-query';
import { Roles } from '../models/enums/roles';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<UserDto> {

  constructor(httpService: HttpService) {
    super(httpService);
    super.basePath = '/api/users';
  }

  parseParameters(request: ODataQuery) {
    if (request.filterInput) {
      const lower = request.filterInput.toLowerCase();
      request.filter = `contains(email.toLower(), '${lower}') or contains(name.toLower(), '${lower}')`;
    }

    if (request.sortColumn) {
      if (!request.sortDirection) {
        request.sortDirection = 'asc';
      }

      request.orderBy = `${request.sortColumn} ${request.sortDirection}`;
    }
  }

  getRoleOptions(): string[] {
    return Object.keys(Roles).filter(key => !isNaN(Number(Roles[key])));
  }
}
