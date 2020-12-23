import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ListDto } from 'src/app/models/dtos/list-dto';
import { ListQuery } from 'src/app/models/list-query';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-list-list',
  templateUrl: './list-list.component.html',
  styleUrls: ['./list-list.component.sass']
})
export class ListListComponent implements OnInit {
  data: ListDto[];
  count: number;
  page = 0;
  sortDirection: string;
  sortColumn: string;

  filter: FormControl;

  columns = ['name'];

  constructor(
    private listService: ListService,
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

  async details(row: ListDto): Promise<void> {
    await this.router.navigateByUrl(`/list/edit?id=${row.id}`);
  }

  async updateData(): Promise<void> {
    const request = {
      page: this.page,
      sortDirection: this.sortDirection,
      sortColumn: this.sortColumn,
      query: this.filter.value,
    } as ListQuery;

    const result = await this.listService.getList(request);
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
