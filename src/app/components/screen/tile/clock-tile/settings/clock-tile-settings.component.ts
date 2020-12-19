import { Component, OnInit, OnDestroy } from '@angular/core';
import { JsonEditorComponent } from '../../../../json-editor.component';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';
import { ClockConfig } from 'src/app/models/tile-configs/clock-config';
import { merge, Subscription } from 'rxjs';

@Component({
  selector: 'app-clock-tile-settings',
  templateUrl: './clock-tile-settings.component.html',
  styleUrls: ['./clock-tile-settings.component.sass'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ClockTileSettingsComponent,
      multi: true,
    },
  ],
})
export class ClockTileSettingsComponent extends JsonEditorComponent<ClockConfig>
  implements OnInit, ControlValueAccessor, OnDestroy {
  showDate: FormControl;
  dateFormat: FormControl;
  showSeconds: FormControl;

  changeSubscription: Subscription;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.showDate = new FormControl();
    this.dateFormat = new FormControl();
    this.showSeconds = new FormControl();

    this.changeSubscription = merge(
      this.dateFormat.valueChanges,
      this.showSeconds.valueChanges,
      this.showDate.valueChanges
    ).subscribe((x) => {
      this.onChange(this.serialize());
    });
  }

  protected serialize(): string {
    const config: ClockConfig = {
      showDate: this.showDate.value,
      dateFormat: this.dateFormat.value,
      showSeconds: this.showSeconds.value
    };

    return JSON.stringify(config);
  }

  protected updateValue(value: ClockConfig): void {
    this.showDate.setValue(value.showDate);
    this.dateFormat.setValue(value.dateFormat);
    this.showSeconds.setValue(value.showSeconds);
  }

  ngOnDestroy() {
    this.changeSubscription.unsubscribe();
  }
}
