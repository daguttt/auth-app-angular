import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const passwordsMustBeEqual: ValidatorFn = (
  group: AbstractControl
): null | ValidationErrors => {
  const newPassword = group.get('newPassword') as FormControl;
  const confirmPassword = group.get('confirmPassword') as FormControl;
  return newPassword.value === confirmPassword.value
    ? null
    : { passwordsMustBeEqual: true };
};
