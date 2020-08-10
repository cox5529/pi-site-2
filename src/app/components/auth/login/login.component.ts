import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginRequest } from 'src/app/models/requests/login-request';
import { Router } from '@angular/router';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', Validators.email),
      password: new FormControl(),
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const request = new LoginRequest();
    request.email = this.form.get('email').value;
    request.password = this.form.get('password').value;
    
    var response = await this.authService.login(request);
    if (response.ok) {
      await this.router.navigateByUrl('/');
    } else if (response.status == 401) {
      this.snackBar.open('Incorrect username or password', 'Dismiss');
    } else {
      this.snackBar.open('Something went wrong. Please try again later.', 'Dismiss');
    }
  }
}
