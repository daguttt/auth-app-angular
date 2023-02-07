import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { Observable, map } from 'rxjs';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsNotLoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): Observable<true | UrlTree> {
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn) => !isLoggedIn || this.router.createUrlTree(['/']))
    );
  }
}
