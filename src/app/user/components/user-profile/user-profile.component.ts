import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { passwordsMustBeEqual } from 'src/app/auth/validators/passwords-must-be-equal.validator';
import { validatorsForPasswords } from 'src/app/auth/constants/password-validators';

import { UserService } from '../../user.service';
import { ChangePasswordDto } from '../../types/change-password.dto';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: [
    `
      form div {
        padding: 24px;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
        margin-bottom: 16px;
      }
    `,
  ],
})
export class UserProfileComponent {
  passwordChangeForm = new FormGroup(
    {
      newPassword: new FormControl('', validatorsForPasswords),
      confirmPassword: new FormControl('', validatorsForPasswords),
    },
    {
      validators: [passwordsMustBeEqual],
      updateOn: 'blur',
    }
  );

  get newPasswordControl(): FormControl {
    return this.passwordChangeForm.get('newPassword') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.passwordChangeForm.get('confirmPassword') as FormControl;
  }

  constructor(private userService: UserService) {}

  onChangePassword() {
    const changePasswordDto = this.passwordChangeForm
      .value as ChangePasswordDto;
    this.userService.changePassword(changePasswordDto).subscribe({
      next: () => {
        this.passwordChangeForm.reset();
        window.alert('Contraseña cambiada correctamente');
      },
      error: () => this.passwordChangeForm.setErrors({ unExpectedError: true }),
    });
  }
}
