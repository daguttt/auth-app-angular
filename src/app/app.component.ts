import { Component } from '@angular/core';

import { map } from 'rxjs';

import { AuthService } from './auth/auth.service';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  authUser$ = this.authService.authUser$;
  isLoading$ = this.loadingService.isLoading$;
  cannotShowLogOutButton$ = this.authUser$.pipe(
    map((user) => (user ? 'inline-block' : 'none'))
  );

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  logOut() {
    this.authService.logOut().subscribe();
  }
}
