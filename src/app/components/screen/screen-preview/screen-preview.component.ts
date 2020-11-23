import { Component, OnInit, Input } from '@angular/core';
import { TileDto } from 'src/app/models/dtos/tile-dto';
import { Locations } from 'src/app/models/enums/locations';
import { ScreenService } from 'src/app/services/screen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-screen-preview',
  templateUrl: './screen-preview.component.html',
  styleUrls: ['./screen-preview.component.sass']
})
export class ScreenPreviewComponent implements OnInit {
  @Input() tiles: TileDto[];
  @Input() isPreview = true;

  constructor(
    private screenService: ScreenService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      if (this.tiles) {
        return;
      }

      if (!params || !params.id) {
        await this.router.navigateByUrl('/auth/login');
        return;
      }

      if (params.key) {
        this.httpService.logout();
        this.httpService.login(params.key);
      }

      const id = params.id;
      const response = await this.screenService.get(id);
      if (response.ok && response.body && response.body.value && response.body.value.length === 1) {
        const screen = response.body.value[0];
        this.tiles = screen.tiles;
      } else if (response.status === 404) {
        await this.router.navigateByUrl('/screen');
      } else {
        this.snackbar.open(
          'Something went wrong. Please try again later.',
          'Dismiss'
        );
      }
    });
  }

  getTileByLocation(location: string): TileDto {
    const result = this.tiles.filter(x => Locations[Locations[x.location]] === location);
    if (result.length === 0) {
      return null;
    }

    return result[0];
  }
}
