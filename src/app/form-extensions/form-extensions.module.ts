import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorsContainerComponent } from './components/form-errors-container/form-errors-container.component';
import { FormErrorMsgComponent } from './components/form-error-msg/form-error-msg.component';

@NgModule({
  declarations: [FormErrorsContainerComponent, FormErrorMsgComponent],
  imports: [CommonModule],
  exports: [FormErrorsContainerComponent, FormErrorMsgComponent],
})
export class FormExtensionsModule {}
