import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListDto } from 'src/app/models/dtos/list-dto';

@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.sass']
})
export class ListCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private listService: ListService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(),
      data: this.formBuilder.control('[]')
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const data = new ListDto();
    data.name = this.form.get('name').value;
    data.jsonData = this.form.get('data').value;

    const result = await this.listService.create(data);
    if (result.ok) {
      await this.router.navigateByUrl('/list');
    } else {
      this.snackbar.open(
        'Something went wrong. Please try again later.',
        'Dismiss'
      );
    }
  }
}
