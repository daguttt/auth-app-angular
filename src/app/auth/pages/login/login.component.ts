import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { map } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/environments/environment';
import { emailValidators } from '../../constants/email-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    email: ['', emailValidators],
    password: ['', [Validators.required]],
  });

  apiUrl: string = environment.apiUrl;

  isSubmitButtonDisabled$ = this.loginForm.statusChanges.pipe(
    map((status) => status === 'INVALID' || status === null)
  );

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  logIn() {
    const credentials = this.loginForm.value;
    this.authService.logIn(credentials).subscribe({
      error: (err: Error) => window.alert(err.message),
    });
  }
}
