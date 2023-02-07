import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, map, mergeMap } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { LoadingService } from 'src/app/loading.service';
import { emailValidators } from '../../constants/email-validators';
import { logInWithGoogleUrl } from '../../constants/urls';

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

  logInWithGoogleUrl: string = logInWithGoogleUrl;

  isLoading$ = this.loadingService.isLoading$;

  isSubmitButtonDisabled$: Observable<boolean> =
    this.loginForm.statusChanges.pipe(
      mergeMap((status) =>
        this.isLoading$.pipe(
          map((isLoading) => (isLoading ? 'PENDING' : status))
        )
      ),
      map((status) => ['INVALID', 'PENDING', null].includes(status))
    );

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) {}

  logIn() {
    const credentials = this.loginForm.value;
    this.authService.logIn(credentials).subscribe({
      error: (err: Error) => window.alert(err.message),
    });
  }
  logInWithGoogle() {
    this.loadingService.markLoading();
    window.location.assign(this.logInWithGoogleUrl);
  }
}
