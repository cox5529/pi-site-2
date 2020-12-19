import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TileDto } from 'src/app/models/dtos/tile-dto';
import { Locations } from 'src/app/models/enums/locations';
import { ScreenService } from 'src/app/services/screen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { HttpService } from 'src/app/services/http.service';
import { SessionService } from 'src/app/services/session.service';
import { concat, merge, Subscription, timer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-screen-preview',
  templateUrl: './screen-preview.component.html',
  styleUrls: ['./screen-preview.component.sass']
})
export class ScreenPreviewComponent implements OnInit, OnDestroy {
  @Input() tiles: TileDto[] = [];
  @Input() isPreview = true;

  id: string;
  key: string;

  subscriptions: Subscription[] = [];

  constructor(
    private screenService: ScreenService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    merge(this.route.queryParams, timer(0, environment.tileRefreshInterval * 1000)).subscribe(async (x) => {
      if (typeof x !== 'number') {
        if (!x || !x.id) {
          await this.router.navigateByUrl('/auth/login');
          return;
        }

        if (x.key) {
          this.sessionService.logout();
          this.sessionService.login(x.key);
        }

        this.id = x.id;
        this.key = x.key;
      }

      const response = await this.screenService.get(this.id);
      if (response.ok && response.body) {
        const screen = response.body;
        this.tiles = screen.tiles;
      } else if (response.status === 404) {
        if (this.key) {
          this.snackbar.open('The requested screen does not exist.', 'Dismiss');
        } else {
          await this.router.navigateByUrl('/screen');
        }
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

  ngOnDestroy(): void {
    console.log('destroy');
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
