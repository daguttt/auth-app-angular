import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  authUser$ = this.authService.authUser$;

  cannotShowLogOutButton$ = this.authUser$.pipe(
    map((user) => (user ? 'inline-block' : 'none'))
  );

  constructor(private authService: AuthService) {}

  logOut() {
    this.authService.logOut().subscribe();
  }
}
