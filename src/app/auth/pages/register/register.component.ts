import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { timer } from 'rxjs';

import { LoadingService } from 'src/app/loading.service';
import { validatorsForPasswords } from '../../constants/password-validators';
import { emailValidators } from '../../constants/email-validators';
import { AuthService } from '../../auth.service';
import { RegisterCredentials } from '../../types/register-credentials.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  registerForm = new FormGroup(
    {
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', emailValidators),
      password: new FormControl('', validatorsForPasswords),
    },
    {
      updateOn: 'blur',
    }
  );

  isLoading$ = this.loadingService.isLoading$;

  get fullNameControl(): FormControl {
    return this.registerForm.get('fullName') as FormControl;
  }

  get emailControl(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  register() {
    if (this.registerForm.invalid) return;

    const credentials = this.registerForm.value as RegisterCredentials;
    this.authService.register(credentials).subscribe({
      error: (err: Error) => {
        window.alert(err.message);
        this.registerForm.setErrors({ someError: true });
        timer(5000).subscribe(() => this.registerForm.setErrors(null));
      },
    });
  }

  registerWithGoogle() {
    this.authService.authenticateWithGoogle();
  }
}
