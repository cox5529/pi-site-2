import { Component, OnInit, Input } from '@angular/core';
import { TileDto } from 'src/app/models/dtos/tile-dto';
import { Locations } from 'src/app/models/enums/locations';

@Component({
  selector: 'app-screen-preview',
  templateUrl: './screen-preview.component.html',
  styleUrls: ['./screen-preview.component.sass']
})
export class ScreenPreviewComponent implements OnInit {
  @Input() tiles: TileDto[];
  @Input() isPreview = true;

  constructor() { }

  ngOnInit(): void {
  }

  getTileByLocation(location: string): TileDto {
    const result = this.tiles.filter(x => Locations[Locations[x.location]] === location);
    if (result.length === 0) {
      return null;
    }

    return result[0];
  }
}
