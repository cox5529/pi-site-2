import { UserDto } from '../dtos/user-dto';

export class UserListResponse {
  results: UserDto[];
  count: number;
}