import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JsonEditorComponent } from 'src/app/components/json-editor.component';
import { WeatherConfig } from 'src/app/models/tile-configs/weather-config';

@Component({
  selector: 'app-weather-tile-settings',
  templateUrl: './weather-tile-settings.component.html',
  styleUrls: ['./weather-tile-settings.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: WeatherTileSettingsComponent,
      multi: true,
    },
  ],
})
export class WeatherTileSettingsComponent extends JsonEditorComponent<WeatherConfig>
  implements OnInit, ControlValueAccessor, OnDestroy {
  form: FormGroup;

  changeSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();

    this.form = this.formBuilder.group({
      zip: this.formBuilder.control('')
    });

    this.changeSubscription = this.form.valueChanges.subscribe(() => this.onChange(this.serialize()));
  }

  ngOnInit(): void {
  }

  protected updateValue(value: WeatherConfig): void {
    this.form.get('zip').setValue(value.zip);
  }

  protected serialize(): string {
    const value: WeatherConfig = this.form.value as WeatherConfig;
    return JSON.stringify(value);
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }
}
