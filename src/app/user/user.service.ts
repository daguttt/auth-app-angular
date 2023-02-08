import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { EMPTY, Observable, catchError, finalize } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ChangePasswordDto } from './types/change-password.dto';
import { LoadingService } from '../loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  changePassword(changePasswordDto: ChangePasswordDto): Observable<never> {
    this.loadingService.markLoading();
    return this.http
      .patch<never>(`${this.apiUrl}/users/change-password`, changePasswordDto)
      .pipe(
        finalize(() => this.loadingService.clearLoading()),
        catchError((err) => {
          console.error({ err, message: "Couldn't change the password" });
          return EMPTY;
        })
      );
  }
}
