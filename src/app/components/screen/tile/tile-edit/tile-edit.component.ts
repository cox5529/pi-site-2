import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { TileService } from 'src/app/services/tile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TileDto } from 'src/app/models/dtos/tile-dto';

@Component({
  selector: 'app-tile-edit',
  templateUrl: './tile-edit.component.html',
  styleUrls: ['./tile-edit.component.sass'],
})
export class TileEditComponent implements OnInit {
  data: TileDto;
  form: FormGroup;

  types: string[] = [];
  locations: string[] = [];

  constructor(
    private tileService: TileService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: new FormControl({ value: '', disabled: true }),
      location: new FormControl(),
    });

    this.locations = this.tileService.getLocations();
    this.types = this.tileService.getTypes();

    this.route.queryParams.subscribe(async (params) => {
      if (!params || !params.id) {
        await this.router.navigateByUrl('/screen');
        return;
      }

      const id = params.id;
      const response = await this.tileService.get(id);
      if (
        response.ok &&
        response.body &&
        response.body.value &&
        response.body.value.length === 1
      ) {
        this.data = response.body.value[0];

        this.form.get('type').setValue(this.data.type);
        this.form.get('location').setValue(this.data.location);
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

    this.data.location = this.form.get('location').value;

    const result = await this.tileService.edit(this.data);
    if (result.ok) {
      await this.router.navigateByUrl(`/screen/edit?id=${this.data.screenId}`);
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
        prompt: `Are you sure you want to delete '${this.data.location} - ${this.data.type}'?`,
        trueButton: 'Yes',
        falseButton: 'No',
      },
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      const response = await this.tileService.delete(this.data.id);
      if (response.ok) {
        await this.router.navigateByUrl(
          `/screen/edit?id=${this.data.screenId}`
        );
      } else {
        this.snackbar.open(
          'Something went wrong when deleting the kiosk. Please try again later.',
          'Dismiss'
        );
      }
    }
  }
}
