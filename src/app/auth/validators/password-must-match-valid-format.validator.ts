import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { passwordFormat } from '../constants/password-format';

export const passwordMustMatchValidFormat: ValidatorFn = (
  control: AbstractControl
): null | ValidationErrors => {
  const value = (control as FormControl<string | null>).value ?? '';
  if (value.length === 0) return null;

  return passwordFormat.test(value)
    ? null
    : { passwordMustMatchValidFormat: true };
};
