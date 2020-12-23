import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ForgotPasswordRequest } from 'src/app/models/requests/forgot-password-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.email)
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const request = new ForgotPasswordRequest();
    request.email = this.form.get('email').value;

    const response = await this.authService.forgotPassword(request);
    if (response.ok) {
      this.snackBar.open('You will receive an email with a link to reset your password soon.', 'Dismiss');
      await this.router.navigateByUrl('/auth/login');
    } else {
      this.snackBar.open('Something went wrong. Please try again later.', 'Dismiss');
    }
  }
}
