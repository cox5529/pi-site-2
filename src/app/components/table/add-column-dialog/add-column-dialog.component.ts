import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'app-add-column-dialog',
  templateUrl: './add-column-dialog.component.html',
  styleUrls: ['./add-column-dialog.component.sass']
})
export class AddColumnDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddColumnDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control('')
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }

    const result: Column = {
      name: this.form.get('name').value,
      id: 0
    };
    this.dialogRef.close(result);
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
