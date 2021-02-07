import { Component, OnInit } from '@angular/core';
import { ScreenDto } from 'src/app/models/dtos/screen-dto';
import { ScreenService } from 'src/app/services/screen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-screen-details',
  templateUrl: './screen-details.component.html',
  styleUrls: ['./screen-details.component.sass']
})
export class ScreenDetailsComponent implements OnInit {
  data: ScreenDto;
  roles: string;

  constructor(
    private screenService: ScreenService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      if (!params || !params.id) {
        const screens = await this.screenService.getList();
        if (!screens.ok) {
          this.snackbar.open('Something went wrong. Please try again later.', 'Dismiss');
          return;
        }

        if (screens.count === 0) {
          const screen = new ScreenDto();
          screen.name = 'Dashboard';
          screen.tiles = [];
          const result = await this.screenService.create(screen);
          if (result.ok) {
            await this.router.navigate(['/screen/details'], { queryParams: { id: result.body.id }});
            return;
          }

          this.snackbar.open('Something went wrong. Please try again later.', 'Dismiss');
          return;
        }

        await this.router.navigate(['/screen/details'], { queryParams: { id: screens.data[0].id }});
        return;
      }

      const id = params.id;
      const response = await this.screenService.get(id);
      if (response.ok && response.body) {
        this.data = response.body;
      } else if (response.status === 404) {
        await this.router.navigateByUrl('/screen/details');
      } else {
        this.snackbar.open(
          'Something went wrong. Please try again later.',
          'Dismiss'
        );
      }
    });
  }
}
