import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JsonEditorComponent } from '../../../json-editor.component';

@Component({
  selector: 'app-tile-configuration',
  templateUrl: './tile-configuration.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TileConfigurationComponent,
      multi: true,
    },
  ],
})
export class TileConfigurationComponent
  extends JsonEditorComponent<any>
  implements OnInit, ControlValueAccessor, OnDestroy {
  @Input() type: string;

  control: FormControl;
  changeSubscription: Subscription;
  onChange = (_: string) => {};

  ngOnInit(): void {
    this.control = new FormControl();

    this.changeSubscription = this.control.valueChanges.subscribe((x) => {
      this.onChange(x);
    });
  }

  protected updateValue(value: any): void {
    this.control.setValue(value);
  }

  protected serialize(): string {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }
}
