import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/dtos/user-dto';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { PageEvent } from '@angular/material/paginator';
import { ODataQuery } from 'src/app/models/odata-query';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass'],
})
export class UserDetailsComponent implements OnInit {
  ngOnInit(): void {
  }

}
