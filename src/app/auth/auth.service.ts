import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  finalize,
  ignoreElements,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { LoadingService } from 'src/app/loading.service';
import { AuthUser } from './types/auth-user.interface';
import { LoginCredentials } from './types/login-credentials.interface';
import { RegisterCredentials } from './types/register-credentials.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser = new BehaviorSubject<AuthUser | null>(null);
  authUser$ = this.authUser.asObservable();
  isLoggedIn$ = this.authUser$.pipe(map(Boolean));

  apiUrl = environment.apiUrl;
  logInWithGoogleUrl = `${this.apiUrl}/auth/login/federated/google`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  logIn(credentials: LoginCredentials): Observable<AuthUser | null> {
    this.loadingService.markLoading();
    return this.http.post<never>(`${this.apiUrl}/auth/login`, credentials).pipe(
      switchMap(() => this.handleSuccesfullLogIn()),
      finalize(() => this.loadingService.clearLoading()),
      catchError((err: HttpErrorResponse) => {
        console.error({ err, message: err.error.message });
        return throwError(() => new Error(err.error.message));
      })
    );
  }

  register(registerCredentials: RegisterCredentials): Observable<never> {
    this.loadingService.markLoading();
    return this.http
      .post<never>(`${this.apiUrl}/auth/register`, registerCredentials)
      .pipe(
        switchMap(() => this.handleSuccesfullLogIn()),
        ignoreElements(),
        finalize(() => this.loadingService.clearLoading()),
        catchError((err: HttpErrorResponse) => {
          console.error({ err, message: err.error.message });
          return throwError(() => new Error(err.error.message));
        })
      );
  }

  getAuthUser(): Observable<AuthUser | null> {
    return this.http.get<AuthUser | null>(`${this.apiUrl}/auth/user`).pipe(
      tap((user) => this.authUser.next(user)),
      catchError((err) => {
        console.error({ err, message: err.message });
        return of(null);
      })
    );
  }

  logOut(): Observable<never> {
    this.loadingService.markLoading();
    return this.http.delete<never>(`${this.apiUrl}/auth/logout`).pipe(
      tap(() => this.handleLogOut()),
      finalize(() => this.loadingService.clearLoading()),
      catchError(() => {
        this.handleLogOut();
        return EMPTY;
      })
    );
  }

  private handleSuccesfullLogIn(): Observable<AuthUser | null> {
    return this.getAuthUser().pipe(tap(() => this.redirecToHome()));
  }

  private handleLogOut(): void {
    this.authUser.next(null);
    this.redirectUserToLogIn();
  }

  private redirectUserToLogIn(): void {
    this.router.navigate(['/auth/login']);
  }

  private redirecToHome(): void {
    this.router.navigateByUrl('/');
  }
}
