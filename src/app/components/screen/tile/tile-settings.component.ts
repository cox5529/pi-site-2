import { ControlValueAccessor } from '@angular/forms';

export abstract class TileSettingsComponent<T> implements ControlValueAccessor {

  onChange = (_: string) => {};

  constructor() {}

  writeValue(json: string): void {
    if (!json) {
      json = '{}';
    }

    let data: T;
    try {
      data = JSON.parse(json);
    } catch {
      data = {} as T;
    }

    this.updateValue(data);
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = (value: string) => {
      fn(value);
    };
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  protected abstract updateValue(value: T): void;

  protected abstract serialize(): string;
}
