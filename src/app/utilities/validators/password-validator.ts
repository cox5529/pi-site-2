import { ValidatorFn, AbstractControl } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value: string = control.value;
    if (!value || value.length < 8) {
      return { length: true };
    }

    if (!value.match(/.*[A-Z].*/g)) {
      return { uppercase: true };
    }

    if (!value.match(/.*[a-z].*/g)) {
      return { lowercase: true };
    }

    if (!value.match(/.*[0-9].*/g)) {
      return { number: true };
    }

    if (!value.match(/.*[!@#$%^&*)(_+\-=\\|}{;:'",\./<>?`~].*/g)) {
      return { symbol: true };
    }

    return null;
  };
}