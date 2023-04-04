import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SubmitButtonComponent } from '../components/submit-button/submit-button.component';
import { FormExtensionsModule } from '../form-extensions';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SubmitButtonComponent,
    FormExtensionsModule,
  ],
  providers: [],
})
export class UserModule {}
