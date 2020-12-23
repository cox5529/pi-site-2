import { BaseDto } from './base-dto';

export class ListDto implements BaseDto {
  id: string;
  userId: string;
  shared: boolean;
  name: string;
  jsonData: string;
}
