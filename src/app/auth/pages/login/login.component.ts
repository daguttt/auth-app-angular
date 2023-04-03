import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/loading.service';
import { emailValidators } from '../../constants/email-validators';
import { passwordValidators } from '../../constants/password-validators';
import { LoginCredentials } from '../../types/login-credentials.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', emailValidators),
    password: new FormControl('', passwordValidators),
  });

  isLoading$ = this.loadingService.isLoading$;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  logIn() {
    if (this.loginForm.invalid) return;

    const credentials = this.loginForm.value as LoginCredentials;
    this.authService.logIn(credentials).subscribe({
      error: (err: Error) => window.alert(err.message),
    });
  }

  logInWithGoogle() {
    this.authService.authenticateWithGoogle();
  }
}
