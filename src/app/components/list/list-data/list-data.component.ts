import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ListRow } from 'src/app/models/list-row';
import { Table } from 'src/app/models/table';
import { JsonEditorComponent } from '../../json-editor.component';
import { ListRowDialogComponent } from '../list-row-dialog/list-row-dialog.component';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ListDataComponent,
      multi: true,
    },
  ],
})
export class ListDataComponent extends JsonEditorComponent<ListRow[]> implements ControlValueAccessor {
  list: ListRow[] = [];

  constructor(
    private dialog: MatDialog
  ) {
    super();
  }

  addRow(): void {
    const dialogRef = this.dialog.open(ListRowDialogComponent, {
      width: '400px',
      data: {
        id: this.nextRowId(),
        edit: false
      }
    });

    dialogRef.afterClosed().subscribe((x: ListRow) => {
      if (!x) {
        return;
      }

      this.list.push(x);

      this.saveChanges();
    });
  }

  editRow(row: ListRow): void {
    const dialogRef = this.dialog.open(ListRowDialogComponent, {
      width: '400px',
      data: {
        id: row.id,
        edit: true,
        text: row.text
      }
    });

    dialogRef.afterClosed().subscribe((x: ListRow) => {
      if (!x) {
        return;
      } else if (x.text) {
        row.text = x.text;
      } else {
        this.list = this.list.filter(item => item.id !== row.id);
      }

      this.saveChanges();
    });
  }

  drop(event: CdkDragDrop<ListRow>): void {
    moveItemInArray(this.list, event.previousIndex, event.currentIndex);
    this.saveChanges();
  }

  protected updateValue(value: ListRow[]): void {
    this.list = value;
  }

  protected serialize(): string {
    return JSON.stringify(this.list);
  }

  private saveChanges(): void {
    this.onChange(this.serialize());
  }

  private nextRowId(): number {
    let largest = 0;

    for (const row of this.list) {
      if (row.id > largest) {
        largest = row.id;
      }
    }

    return largest + 1;
  }
}
