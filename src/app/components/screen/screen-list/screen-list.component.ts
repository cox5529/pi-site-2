import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ListQuery } from 'src/app/models/list-query';
import { ScreenDto } from 'src/app/models/dtos/screen-dto';
import { ScreenService } from 'src/app/services/screen.service';

@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.sass']
})
export class ScreenListComponent implements OnInit {
  data: ScreenDto[];
  count: number;
  page = 0;
  sortDirection: string;
  sortColumn: string;

  filter: FormControl;

  columns = ['name'];

  constructor(
    private screenService: ScreenService,
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

  async details(row: ScreenDto): Promise<void> {
    await this.router.navigateByUrl(`/screen/details?id=${row.id}`);
  }

  async updateData(): Promise<void> {
    const request = {
      page: this.page,
      sortDirection: this.sortDirection,
      sortColumn: this.sortColumn,
      query: this.filter.value,
    } as ListQuery;

    const result = await this.screenService.getList(request);
    if (result.ok) {
      this.data = result.data;
      this.count = result.count;
    } else {
      this.snackbar.open(
        'Something went wrong. Please try again later.',
        'Dismiss'
      );
    }
  }
}
