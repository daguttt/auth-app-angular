import { Validators } from '@angular/forms';
import { passwordMustMatchValidFormat } from '../validators/password-must-match-valid-format.validator';

export const passwordValidators = [
  Validators.required,
  passwordMustMatchValidFormat,
];
