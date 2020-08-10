import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalValidator(otherControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    return otherControl.value === control.value ? null : { equal: true };
  };
}
