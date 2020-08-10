import { BaseDto } from './base-dto';
import { TileTypes } from '../enums/tile-types';
import { Locations } from '../enums/locations';

export class TileDto implements BaseDto {
  id: string;
  screenId: string;
  type: TileTypes;
  location: Locations;
  configurationJson: string;
}
