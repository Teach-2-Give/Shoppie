import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSource = new BehaviorSubject<string>('');
  private typeSource = new BehaviorSubject<'success' | 'error'>('success');
  private visibilitySource = new BehaviorSubject<boolean>(false);

  currentMessage = this.messageSource.asObservable();
  currentType = this.typeSource.asObservable();
  isVisible = this.visibilitySource.asObservable();

  constructor() {}

  showNotification(message: string, type: 'success' | 'error') {
    this.messageSource.next(message);
    this.typeSource.next(type);
    this.visibilitySource.next(true);

    setTimeout(() => {
      this.visibilitySource.next(false);
    }, 3000); // Hide after 3 seconds
  }
}
