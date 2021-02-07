import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ScreenDto } from '../models/dtos/screen-dto';
import { ListQuery } from '../models/list-query';
import { HttpService } from './http.service';
import { HttpResponse, HttpParams } from '@angular/common/http';
import { ListResponse } from '../models/responses/list-response';
import { environment } from 'src/environments/environment';
import { TileService } from './tile.service';
import { TileDto } from '../models/dtos/tile-dto';
import { Locations } from '../models/enums/locations';

@Injectable({
  providedIn: 'root',
})
export class ScreenService extends CrudService<ScreenDto> {
  constructor(httpService: HttpService, private tileService: TileService) {
    super(httpService);
    super.basePath = '/api/screen';
    super.port = environment.screenServicePort;
  }

  getBlockedLocations(location: string): string[] {
    const locations = this.tileService.getLocations();
    const blocked: string[] = [];
    if (location.endsWith('Third')) {
      blocked.push(...locations.filter((x) => x.endsWith('Column')));

      if (location.startsWith('Upper')) {
        blocked.push(...locations.filter((x) => x.startsWith('Top')));
      } else if (location.startsWith('Middle')) {
        blocked.push(...locations.filter((x) => x.startsWith('Middle')));
      } else if (location.startsWith('Bottom')) {
        blocked.push(...locations.filter((x) => x.startsWith('Bottom')));
      }
    } else if (location.endsWith('Column')) {
      blocked.push(...locations.filter((x) => x.endsWith('Third')));

      if (location.startsWith('Left')) {
        blocked.push(...locations.filter((x) => x.endsWith('Left')));
      } else if (location.startsWith('Middle')) {
        blocked.push(...locations.filter((x) => x.endsWith('Middle')));
      } else if (location.startsWith('Right')) {
        blocked.push(...locations.filter((x) => x.endsWith('Right')));
      }
    }

    if (location.endsWith('Left')) {
      blocked.push('LeftColumn');
    } else if (location.endsWith('Middle')) {
      blocked.push('MiddleColumn');
    } else if (location.endsWith('Right')) {
      blocked.push('RightColumn');
    }

    if (location.startsWith('Top')) {
      blocked.push('UpperThird');
    } else if (location.startsWith('Middle')) {
      blocked.push('MiddleThird');
    } else if (location.startsWith('Bottom')) {
      blocked.push('BottomThird');
    }

    blocked.push(location);
    return blocked;
  }

  isBlocked(tiles: TileDto[], location: string): boolean {
    const locations = tiles.map((x) => x.location);
    for (const loc of locations) {
      let blocked: string[];
      if (typeof loc === 'string') {
        blocked = this.getBlockedLocations(loc);
      } else {
        blocked = this.getBlockedLocations(Locations[loc]);
      }

      if (blocked.includes(location)) {
        return true;
      }
    }

    console.log(locations, location, false);
    return false;
  }
}
