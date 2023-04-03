import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { passwordFormat } from '../constants/password-format';

export const passwordMustMatchValidFormat: ValidatorFn = (
  control: AbstractControl
): null | ValidationErrors => {
  const value = control.value as string;
  if (value.length === 0) return null;

  return passwordFormat.test(value)
    ? null
    : { passwordMustMatchValidFormat: true };
};
