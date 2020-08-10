import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/models/enums/roles';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserDto } from 'src/app/models/dtos/user-dto';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
      if (
        response.ok &&
        response.body &&
        response.body.value &&
        response.body.value.length === 1
      ) {
        this.data = response.body.value[0];

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
}
