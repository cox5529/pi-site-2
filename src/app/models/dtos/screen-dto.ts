import { BaseDto } from './base-dto';
import { TileDto } from './tile-dto';

export class ScreenDto implements BaseDto {
  id: string;
  name: string;
  userId: string;
  tiles: TileDto[];
}
