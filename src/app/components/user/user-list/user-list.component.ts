import { Component, OnInit } from '@angular/core';
import { ListQuery } from 'src/app/models/list-query';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { UserDto } from 'src/app/models/dtos/user-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  users: UserDto[];
  count: number;
  page = 0;
  sortDirection: string;
  sortColumn: string;

  filter: FormControl;

  columns = ['email', 'name', 'emailConfirmed'];

  constructor(
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.filter = new FormControl();
    await this.updateData();
  }

  async onPage(page: PageEvent): Promise<void> {
    this.page = page.pageIndex;
    await this.updateData();
  }

  async onSort(event: Sort): Promise<void> {
    this.sortColumn = event.active;
    this.sortDirection = event.direction;
    await this.updateData();
  }

  async details(row: UserDto): Promise<void> {
    await this.router.navigateByUrl(`/users/details?id=${row.id}`);
  }

  async updateData(): Promise<void> {
    const request = {
      page: this.page,
      sortDirection: this.sortDirection,
      sortColumn: this.sortColumn,
      query: this.filter.value,
    } as ListQuery;

    const result = await this.userService.getList(request);
    if (result.ok) {
      this.users = result.data;
      this.count = result.count;
    } else {
      this.snackbar.open(
        'Something went wrong. Please try again later.',
        'Dismiss'
      );
    }
  }
}
