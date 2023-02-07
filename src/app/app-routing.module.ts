import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IsLoggedInGuard } from './auth/guards/is-logged-in.guard';
import { RegisterComponent } from './auth/pages/register/register.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { IsNotLoggedInGuard } from './auth/guards/is-not-logged-in.guard';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivate: [IsLoggedInGuard],
    component: HomeComponent,
  },
  {
    path: 'auth/login',
    canActivate: [IsNotLoggedInGuard],
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    canActivate: [IsNotLoggedInGuard],
    component: RegisterComponent,
  },
  {
    path: 'user/profile',
    canActivate: [IsLoggedInGuard],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
