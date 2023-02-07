import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable, catchError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ChangePasswordDto } from './types/change-password.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  changePassword(changePasswordDto: ChangePasswordDto): Observable<never> {
    return this.http
      .patch<never>(`${this.apiUrl}/users/change-password`, changePasswordDto)
      .pipe(
        catchError((err) => {
          console.error({ err, message: "Couldn't change the password" });
          return EMPTY;
        })
      );
  }
}
