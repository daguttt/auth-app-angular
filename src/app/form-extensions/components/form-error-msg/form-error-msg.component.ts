import { Attribute, Component, Host, OnInit } from '@angular/core';
import { FormErrorsContainerComponent } from '../form-errors-container/form-errors-container.component';
import { AbstractControl } from '@angular/forms';
import { errorsDictionary } from '../../errors.dictionary';

@Component({
  selector: 'app-form-error-msg',
  template: `
    <small *ngIf="control?.hasError(errorCode)"> {{ errorMsg }} </small>
  `,
})
export class FormErrorMsgComponent implements OnInit {
  control: AbstractControl | null = null;
  errorMsg = '';

  constructor(
    @Host() private errorsContainer: FormErrorsContainerComponent,
    @Attribute('data-error-code') public errorCode: string = '',
    @Attribute('data-custom-msg') public customMsg: string | null = null
  ) {
    this.setErrorMsg();
  }

  ngOnInit(): void {
    this.control = this.errorsContainer.control;
  }

  private setErrorMsg() {
    if (this.customMsg) {
      this.errorMsg = this.customMsg;
      return;
    }
    const msg =
      errorsDictionary[this.errorCode] ??
      `Hay un error en el campo. (code: ${this.errorCode}`;
    this.errorMsg = msg;
  }
}
