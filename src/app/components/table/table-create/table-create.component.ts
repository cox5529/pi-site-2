import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDto } from 'src/app/models/dtos/user-dto';
import { TableDto } from 'src/app/models/dtos/table-dto';
import { MatDialog } from '@angular/material/dialog';
import { AddColumnDialogComponent } from '../add-column-dialog/add-column-dialog.component';
import { Column } from 'src/app/models/column';

@Component({
  selector: 'app-table-create',
  templateUrl: './table-create.component.html',
  styleUrls: ['./table-create.component.sass']
})
export class TableCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private tableService: TableService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(),
      data: this.formBuilder.control('{"columns": [], "data": []}')
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const data = new TableDto();
    data.name = this.form.get('name').value;
    data.jsonData = this.form.get('data').value;

    const result = await this.tableService.create(data);
    if (result.ok) {
      await this.router.navigateByUrl('/table');
    } else {
      this.snackbar.open(
        'Something went wrong. Please try again later.',
        'Dismiss'
      );
    }
  }
}
