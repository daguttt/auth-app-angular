import { CommonModule } from '@angular/common';
import {
  Attribute,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
  @Input() parentFormGroup?: FormGroup;
  @Output('submitted') submitEmitter = new EventEmitter();

  initialFormStatus: FormControlStatus = 'PENDING';

  isLoading$ = this.loadingService.isLoading$;

  isDisabled$?: Observable<boolean>;

  constructor(
    @Attribute('customClasses') public customClasses: string = '',
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    if (!this.parentFormGroup) {
      console.error("Expecting parent FormGroup. It wasn't input");
      return;
    }
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
