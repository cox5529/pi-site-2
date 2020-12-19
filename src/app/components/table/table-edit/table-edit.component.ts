import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TableDto } from 'src/app/models/dtos/table-dto';
import { TableService } from 'src/app/services/table.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.sass']
})
export class TableEditComponent implements OnInit {
  data: TableDto;
  form: FormGroup;

  roleOptions: string[] = [];

  constructor(
    private tableService: TableService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(''),
      data: this.formBuilder.control('{"columns": [], "data": []}')
    });

    this.route.queryParams.subscribe(async (params) => {
      if (!params || !params.id) {
        await this.router.navigateByUrl('/table');
        return;
      }

      const id = params.id;
      const response = await this.tableService.get(id);
      if (response.ok && response.body) {
        this.data = response.body;

        this.form.get('name').setValue(this.data.name);
        this.form.get('data').setValue(this.data.jsonData);
      } else if (response.status === 404) {
        await this.router.navigateByUrl('/table');
      } else {
        this.snackbar.open(
          'Something went wrong. Please try again later.',
          'Dismiss'
        );
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    this.data.name = this.form.get('name').value;
    this.data.jsonData = this.form.get('data').value;

    const result = await this.tableService.edit(this.data);
    if (result.ok) {
      await this.router.navigateByUrl('/table');
    } else {
      this.snackbar.open(
        'Something went wrong. Please try again later.',
        'Dismiss'
      );
    }
  }

  async onDelete(): Promise<void> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: {
        prompt: `Are you sure you want to delete '${this.data.name}'?`,
        trueButton: 'Yes',
        falseButton: 'No'
      }
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      const response = await this.tableService.delete(this.data.id);
      if (response.ok) {
        this.router.navigate(['/table']);
      } else {
        this.snackbar.open('Something went wrong when deleting the table. Please try again later.', 'Dismiss');
      }
    }
  }
}
