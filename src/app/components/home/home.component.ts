import { Component } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent {
  authUser$ = this.authService.authUser$;

  constructor(private authService: AuthService) {}
}
