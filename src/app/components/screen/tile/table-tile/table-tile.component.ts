import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { timer } from 'rxjs';
import { Row } from 'src/app/models/row';
import { Table } from 'src/app/models/table';
import { TableConfig } from 'src/app/models/tile-configs/table-config';
import { TableService } from 'src/app/services/table.service';
import { environment } from 'src/environments/environment';
import { BaseTile } from '../base-tile';

@Component({
  selector: 'app-table-tile',
  templateUrl: './table-tile.component.html',
  styleUrls: ['./table-tile.component.sass']
})
export class TableTileComponent extends BaseTile<TableConfig> {
  table: Table;
  dataSource: MatTableDataSource<Row>;

  get columnNames(): string[] {
    return this.table.columns.map(x => x.name);
  }

  constructor(
    private tableService: TableService
  ) {
    super();

    this.table = {
      columns: [],
      data: []
    };

    this.dataSource = new MatTableDataSource<Row>(this.table.data);
  }

  initialize(): void {
    this.tableService.get(this.configuration.tableId).then((response) => {
      if (response.ok) {
        this.table = JSON.parse(response.body.jsonData) as Table;
        this.dataSource = new MatTableDataSource<Row>(this.table.data);
      }
    });
  }
}
