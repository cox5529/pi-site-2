import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Column } from 'src/app/models/column';
import { Row } from 'src/app/models/row';
import { Table } from 'src/app/models/table';
import { JsonEditorComponent } from '../../json-editor.component';
import { AddColumnDialogComponent } from '../add-column-dialog/add-column-dialog.component';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TableDataComponent,
      multi: true,
    },
  ],
})
export class TableDataComponent extends JsonEditorComponent<Table> implements OnInit, ControlValueAccessor {
  table: Table;
  dataSource: MatTableDataSource<Row>;

  get columnNames(): string[] {
    const columns = this.table.columns.map(x => x.name);
    columns.push('actions');
    return columns;
  }

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    super();

    this.table = {
      columns: [],
      data: []
    };

    this.dataSource = new MatTableDataSource<Row>(this.table.data);
  }

  ngOnInit(): void {
  }

  addColumn(): void {
    const dialogRef = this.dialog.open(AddColumnDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((x: Column) => {
      if (!x) {
        return;
      }

      x.id = this.nextColumnId();

      for (const row of this.table.data) {
        this.initializeCell(row, x);
      }

      this.table.columns.push(x);
    });
  }

  addRow(): void {
    const row: Row = { id: 0 };
    for (const column of this.table.columns) {
      this.initializeCell(row, column);
    }

    row.id = this.nextRowId();

    this.table.data.push(row);
    this.dataSource = new MatTableDataSource(this.table.data);
  }

  protected updateValue(value: Table): void {
    this.table = value;
    this.dataSource = new MatTableDataSource(this.table.data);
  }

  protected serialize(): string {
    return JSON.stringify(this.table);
  }

  private nextColumnId(): number {
    let largest = 0;

    for (const column of this.table.columns) {
      if (column.id > largest) {
        largest = column.id;
      }
    }

    return largest + 1;
  }

  private nextRowId(): number {
    let largest = 0;

    for (const row of this.table.data) {
      if (row.id > largest) {
        largest = row.id;
      }
    }

    return largest + 1;
  }

  private initializeCell(row: Row, column: Column) {
    row[column.name] = '';
  }
}
