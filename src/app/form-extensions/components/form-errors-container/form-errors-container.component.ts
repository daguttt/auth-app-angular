import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors-container',
  template: `
    <div
      class="form-errors-container"
      *ngIf="control && control.invalid && (control.touched || control.dirty)"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class FormErrorsContainerComponent {
  @Input('forControl') control: AbstractControl | null = null;
}
