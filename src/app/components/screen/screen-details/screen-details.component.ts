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
        await this.router.navigateByUrl('/screen');
        return;
      }

      const id = params.id;
      const response = await this.screenService.get(id);
      if (response.ok && response.body && response.body.value && response.body.value.length === 1) {
        this.data = response.body.value[0];
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
}
