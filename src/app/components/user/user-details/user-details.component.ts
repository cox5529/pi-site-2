import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/dtos/user-dto';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from 'src/app/models/enums/roles';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
})
export class UserDetailsComponent implements OnInit {
  data: UserDto;
  roles: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      if (!params || !params.id) {
        await this.router.navigateByUrl('/users');
        return;
      }

      const id = params.id;
      const response = await this.userService.get(id);
      if (response.ok && response.body) {
        this.data = response.body;
        this.roles = '';
        for (const role of this.data.roles) {
          if (this.roles.length > 0) {
            this.roles += ', ';
          }

          this.roles += Roles[Roles[role]];
        }
      } else if (response.status === 404) {
        await this.router.navigateByUrl('/users');
      } else {
        this.snackbar.open(
          'Something went wrong. Please try again later.',
          'Dismiss'
        );
      }
    });
  }
}
