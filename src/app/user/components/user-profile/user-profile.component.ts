import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { passwordsMustBeEqual } from 'src/app/auth/validators/passwords-must-be-equal.validator';
import { passwordValidators } from 'src/app/auth/constants/password-validators';

import { UserService } from '../../user.service';
import { ChangePasswordDto } from '../../types/change-password.dto';
import { getFormControlStatus } from 'src/app/helpers';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [],
})
export class UserProfileComponent {
  passwordChangeForm = new FormGroup(
    {
      newPassword: new FormControl('', passwordValidators),
      confirmPassword: new FormControl('', passwordValidators),
    },
    {
      validators: [passwordsMustBeEqual],
    }
  );

  newPasswordControlStatus$ = getFormControlStatus(
    this.passwordChangeForm.get('newPassword') as FormControl
  );

  confirmPasswordControlStatus$ = getFormControlStatus(
    this.passwordChangeForm.get('confirmPassword') as FormControl
  );

  constructor(private userService: UserService) {}

  onChangePassword() {
    const changePasswordDto = this.passwordChangeForm
      .value as ChangePasswordDto;
    this.userService.changePassword(changePasswordDto).subscribe({
      next: () => {
        this.passwordChangeForm.reset({}, { emitEvent: false });
        window.alert('Contraseña cambiada correctamente');
      },
      error: () => this.passwordChangeForm.setErrors({ unExpectedError: true }),
    });
  }
}
