import { Component, OnInit } from '@angular/core';
import { ODataQuery } from 'src/app/models/odata-query';
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
      skip: 20 * this.page,
      top: 20,
      sortDirection: this.sortDirection,
      sortColumn: this.sortColumn,
      filterInput: this.filter.value,
    } as ODataQuery;

    const result = await this.userService.getList(request);
    console.log(result);
    if (result.ok) {
      this.users = result.value;
      this.count = result['@odata.count'];
    } else {
      this.snackbar.open(
        'Something went wrong. Please try again later.',
        'Dismiss'
      );
    }
  }
}
