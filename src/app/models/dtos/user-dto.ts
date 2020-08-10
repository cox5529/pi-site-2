import { BaseDto } from './base-dto';
import { Roles } from '../enums/roles';

export class UserDto implements BaseDto {
  id: string;
  email: string;
  name: string;
  emailConfirmed: boolean;
  isLockedOut: boolean;
  roles: Roles[];
}
