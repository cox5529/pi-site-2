import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPasswordRequest } from 'src/app/models/requests/reset-password-request';
import { equalValidator } from '../../../utilities/validators/equal-validator';
import { passwordValidator } from '../../../utilities/validators/password-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const passwordControl = new FormControl('', passwordValidator());
    this.form = this.formBuilder.group({
      email: new FormControl({ value: '', disabled: true }),
      password: passwordControl,
      confirmPassword: new FormControl('', equalValidator(passwordControl))
    });

    this.route.queryParams.subscribe(async params => {
      if (!params || !params.email || !params.token) {
        await this.router.navigateByUrl('/');
      }

      this.form.get('email').setValue(params.email);
      this.token = params.token;
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const request = new ResetPasswordRequest();
    request.email = this.form.get('email').value;
    request.password = this.form.get('password').value;
    request.token = this.token;
    
    var response = await this.authService.resetPassword(request);
    if (response.ok) {
      await this.router.navigateByUrl('/');
    } else {
      this.snackBar.open('Something went wrong. Please try again later.', 'Dismiss');
    }
  }
}
