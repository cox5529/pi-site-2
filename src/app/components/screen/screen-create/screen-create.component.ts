import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ScreenService } from 'src/app/services/screen.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDto } from 'src/app/models/dtos/user-dto';
import { ScreenDto } from 'src/app/models/dtos/screen-dto';

@Component({
  selector: 'app-screen-create',
  templateUrl: './screen-create.component.html',
  styleUrls: ['./screen-create.component.sass']
})
export class ScreenCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private screenService: ScreenService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl()
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const data = new ScreenDto();
    data.name = this.form.get('name').value;

    const result = await this.screenService.create(data);
    if (result.ok) {
      await this.router.navigateByUrl('/screen');
    } else {
      this.snackbar.open(
        'Something went wrong. Please try again later.',
        'Dismiss'
      );
    }
  }
}
