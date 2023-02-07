import { Validators } from '@angular/forms';

export const validatorsForPasswords = [
  Validators.required,
  Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}/),
];
