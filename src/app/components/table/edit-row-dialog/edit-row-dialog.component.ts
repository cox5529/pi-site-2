import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Column } from 'src/app/models/column';
import { Row } from 'src/app/models/row';

@Component({
  selector: 'app-edit-row-dialog',
  templateUrl: './edit-row-dialog.component.html',
  styleUrls: ['./edit-row-dialog.component.sass']
})
export class EditRowDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditRowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditRowDialogData
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({});

    for (const column of this.data.columns) {
      this.form.addControl(column.name, this.formBuilder.control(this.data.row[column.name]));
    }
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }

    const result: Row = {
      id: this.data.row.id
    };

    for (const column of this.data.columns) {
      result[column.name] = this.form.get(column.name).value;
    }

    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

export interface EditRowDialogData {
  columns: Column[];
  row: Row;
}
