import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Router, UrlTree } from '@angular/router';

import { Observable, map } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate, CanMatch {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<true | UrlTree> {
    return this.isUserLoggedIn();
  }

  canMatch(): Observable<true | UrlTree> {
    return this.isUserLoggedIn();
  }

  private isUserLoggedIn(): Observable<true | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
      map(
        (isLoggedIn) => isLoggedIn || this.router.createUrlTree(['/auth/login'])
      )
    );
  }
}
