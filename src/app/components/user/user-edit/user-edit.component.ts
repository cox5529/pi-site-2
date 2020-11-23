import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/models/enums/roles';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserDto } from 'src/app/models/dtos/user-dto';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass'],
})
export class UserEditComponent implements OnInit {
  data: UserDto;
  form: FormGroup;

  roleOptions: string[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl({ value: '', disabled: true }),
      name: new FormControl(),
      roles: new FormControl(),
    });

    this.roleOptions = this.userService.getRoleOptions();

    this.route.queryParams.subscribe(async (params) => {
      if (!params || !params.id) {
        await this.router.navigateByUrl('/users');
        return;
      }

      const id = params.id;
      const response = await this.userService.get(id);
      if (response.ok && response.body) {
        this.data = response.body;

        this.form.get('email').setValue(this.data.email);
        this.form.get('name').setValue(this.data.name);
        this.form
          .get('roles')
          .setValue(this.data.roles.map((r) => Roles[Roles[r]]));
      } else if (response.status === 404) {
        await this.router.navigateByUrl('/users');
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
    this.data.roles = this.form.get('roles').value as string[];

    const result = await this.userService.edit(this.data);
    if (result.ok) {
      await this.router.navigateByUrl('/users');
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
      const response = await this.userService.delete(this.data.id);
      if (response.ok) {
        this.router.navigate(['/users']);
      } else {
        this.snackbar.open('Something went wrong when deleting the user. Please try again later.', 'Dismiss');
      }
    }
  }
}
