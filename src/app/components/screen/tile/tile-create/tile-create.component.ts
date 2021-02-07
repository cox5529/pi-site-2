import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TileService } from 'src/app/services/tile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TileDto } from 'src/app/models/dtos/tile-dto';
import { Locations } from 'src/app/models/enums/locations';

@Component({
  selector: 'app-tile-create',
  templateUrl: './tile-create.component.html',
  styleUrls: ['./tile-create.component.sass']
})
export class TileCreateComponent implements OnInit {
  form: FormGroup;
  screenId: string;

  types: string[] = [];
  locations: string[] = [];

  constructor(
    private tileService: TileService,
    private router: Router,
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: new FormControl(),
      location: new FormControl(),
      configurationJson: new FormControl()
    });

    this.locations = this.tileService.getLocations();
    this.types = this.tileService.getTypes();

    this.activatedRoute.queryParams.subscribe(async params => {
      if (!params || !params.screenId) {
        await this.router.navigateByUrl('/screen/details');
        return;
      }

      if (params.location) {
        this.form.get('location')?.setValue(params.location);
      }

      this.screenId = params.screenId;
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    const data = new TileDto();
    data.screenId = this.screenId;
    data.location = this.form.get('location').value;
    data.type = this.form.get('type').value;
    data.configurationJson = this.form.get('configurationJson').value ?? '{}';

    const result = await this.tileService.create(data);
    if (result.ok) {
      await this.router.navigateByUrl(`/screen/edit?id=${this.screenId}`);
    } else {
      this.snackbar.open(
        'Something went wrong. Please try again later.',
        'Dismiss'
      );
    }
  }
}
