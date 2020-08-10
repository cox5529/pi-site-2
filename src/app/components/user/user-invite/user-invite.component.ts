import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/dtos/user-dto';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-invite',
  templateUrl: './user-invite.component.html',
  styleUrls: ['./user-invite.component.sass']
})
export class UserInviteComponent implements OnInit {
  form: FormGroup;

  roleOptions: string[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl(),
      name: new FormControl(),
      roles: new FormControl(),
    });

    this.roleOptions = this.userService.getRoleOptions();
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const data = new UserDto();
    data.name = this.form.get('name').value;
    data.roles = this.form.get('roles').value as string[];
    data.email = this.form.get('email').value;

    const result = await this.userService.create(data);
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
