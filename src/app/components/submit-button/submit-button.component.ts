import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControlStatus, FormGroup } from '@angular/forms';
import { Observable, map, mergeMap, startWith } from 'rxjs';
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-submit-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [ngClass]="customClasses"
      (submit)="onSubmit()"
      type="submit"
      [disabled]="isDisabled$ | async"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class SubmitButtonComponent implements OnInit {
  @Input() parentFormGroup!: FormGroup;
  @Input() customClasses: string = '';
  @Output('onSubmit') submitEmitter = new EventEmitter();

  initialFormStatus: FormControlStatus = 'PENDING';

  isLoading$ = this.loadingService.isLoading$;
  isDisabled$!: Observable<boolean>;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.initialFormStatus = this.parentFormGroup.status;
    this.isDisabled$ = this.parentFormGroup.statusChanges.pipe(
      startWith(this.initialFormStatus),
      mergeMap((status) => this.includeLoadingState(status))
    );
  }

  onSubmit() {
    this.submitEmitter.emit();
  }

  private includeLoadingState(status: FormControlStatus) {
    return this.isLoading$.pipe(
      map((isLoading) => {
        return status !== 'VALID' || isLoading;
      })
    );
  }
}
