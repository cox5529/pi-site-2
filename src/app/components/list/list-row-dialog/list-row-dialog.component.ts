import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListRow } from 'src/app/models/list-row';

@Component({
  selector: 'app-list-row-dialog',
  templateUrl: './list-row-dialog.component.html',
  styleUrls: ['./list-row-dialog.component.sass']
})
export class ListRowDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ListRowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ListRowDialogData
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: this.formBuilder.control(this.data.text ? this.data.text : '')
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }

    const result: ListRow = {
      id: this.data.id,
      text: this.form.get('text').value
    };

    this.dialogRef.close(result);
  }

  delete(): void {
    const result: ListRow = {
      id: this.data.id,
      text: null
    };

    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

export interface ListRowDialogData {
  id: number;
  edit: boolean;
  text: string;
}
