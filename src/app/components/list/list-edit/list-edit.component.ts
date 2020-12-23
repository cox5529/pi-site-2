import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ListDto } from 'src/app/models/dtos/list-dto';
import { ListService } from 'src/app/services/list.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.sass']
})
export class ListEditComponent implements OnInit {
  data: ListDto;
  form: FormGroup;

  roleOptions: string[] = [];

  constructor(
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: this.formBuilder.control(''),
      data: this.formBuilder.control('[]')
    });

    this.route.queryParams.subscribe(async (params) => {
      if (!params || !params.id) {
        await this.router.navigateByUrl('/list');
        return;
      }

      const id = params.id;
      const response = await this.listService.get(id);
      if (response.ok && response.body) {
        this.data = response.body;

        this.form.get('name').setValue(this.data.name);
        this.form.get('data').setValue(this.data.jsonData);
      } else if (response.status === 404) {
        await this.router.navigateByUrl('/list');
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

    const result = await this.listService.edit(this.data);
    if (result.ok) {
      await this.router.navigateByUrl('/list');
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
      const response = await this.listService.delete(this.data.id);
      if (response.ok) {
        this.router.navigate(['/list']);
      } else {
        this.snackbar.open('Something went wrong when deleting the list. Please try again later.', 'Dismiss');
      }
    }
  }
}
