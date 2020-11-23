import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { ScreenDto } from 'src/app/models/dtos/screen-dto';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ScreenService } from 'src/app/services/screen.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-screen-edit',
  templateUrl: './screen-edit.component.html',
  styleUrls: ['./screen-edit.component.sass'],
})
export class ScreenEditComponent implements OnInit {
  constructor(
    private screenService: ScreenService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  data: ScreenDto;
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(),
    });

    this.route.queryParams.subscribe(async (params) => {
      if (!params || !params.id) {
        await this.router.navigateByUrl('/screen');
        return;
      }

      const id = params.id;
      const response = await this.screenService.get(id);
      if (response.ok && response.body) {
        this.data = response.body;

        this.form.get('name').setValue(this.data.name);
      } else if (response.status === 404) {
        await this.router.navigateByUrl('/screen');
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

    const result = await this.screenService.edit(this.data);
    if (result.ok) {
      await this.router.navigateByUrl('/screen');
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
        falseButton: 'No',
      },
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      const response = await this.screenService.delete(this.data.id);
      if (response.ok) {
        this.router.navigate(['/screen']);
      } else {
        this.snackbar.open(
          'Something went wrong when deleting the screen. Please try again later.',
          'Dismiss'
        );
      }
    }
  }
}
