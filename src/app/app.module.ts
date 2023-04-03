import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { Observable } from 'rxjs';

import { FormExtensionsModule } from './form-extensions';

import { AuthHeaderInterceptor } from './auth/interceptors/auth-header.interceptor';
import { RegisterComponent } from './auth/pages/register/register.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthUser } from './auth/types/auth-user.interface';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubmitButtonComponent } from './components/submit-button/submit-button.component';

const initilizeAppFactory =
  (authService: AuthService): (() => Observable<AuthUser | null>) =>
  () =>
    authService.getAuthUser();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SubmitButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormExtensionsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initilizeAppFactory,
      multi: true,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
