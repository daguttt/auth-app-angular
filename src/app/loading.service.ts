import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  constructor() {}

  markLoading() {
    this.isLoading.next(true);
  }

  clearLoading() {
    this.isLoading.next(false);
  }
}
