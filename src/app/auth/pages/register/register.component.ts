import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { map, timer } from 'rxjs';

import { environment } from 'src/environments/environment';
import { validatorsForPasswords } from '../../constants/password-validators';
import { emailValidators } from '../../constants/email-validators';
import { AuthService } from '../../auth.service';
import { RegisterCredentials } from '../../types/register-credentials.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
    `
      form div {
        padding: 16px;
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      fullName: new FormControl('Test 1', [Validators.required]),
      email: new FormControl('test@test1.com', emailValidators),
      password: new FormControl('Testico1', validatorsForPasswords),
    },
    {
      updateOn: 'blur',
    }
  );

  apiUrl: string = environment.apiUrl;

  isSubmitButtonDisabled$ = this.registerForm.statusChanges.pipe(
    map((status) => {
      console.log({ status });
      return status === 'INVALID' || status === null;
    })
  );

  get fullNameControl(): FormControl {
    return this.registerForm.get('fullName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  constructor(private authService: AuthService) {}

  register() {
    const credentials: RegisterCredentials = this.registerForm
      .value as RegisterCredentials;
    this.authService.register(credentials).subscribe({
      error: (err: Error) => {
        window.alert(err.message);
        this.registerForm.setErrors({ someError: true });
        timer(5000).subscribe(() => this.registerForm.setErrors(null));
      },
    });
  }
}
