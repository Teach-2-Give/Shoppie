<<<<<<< HEAD
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
=======
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

>>>>>>> ededce58ea6eba6ed43bebbc68bc23a5590b3815

@Component({
  selector: 'app-notification',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="notification" [ngClass]="{ 'success': type === 'success', 'error': type === 'error', 'show': show }">
      <span class="message">{{ message }}</span>
      <fa-icon [icon]="faTimesCircle" (click)="closeNotification()" class="close-icon"></fa-icon>
    </div>
  `,
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Output() close = new EventEmitter<void>();
  show: boolean = false;
  faTimesCircle = faTimesCircle;

  ngOnInit() {
    setTimeout(() => {
      this.show = true;
    }, 10);
  }

  closeNotification() {
    this.show = false;
    setTimeout(() => {
      this.close.emit();
    }, 500);
  }
}
=======
  imports : [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  message: string = '';
  type: 'success' | 'error' = 'success';
  visible = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.currentMessage.subscribe(message => this.message = message);
    this.notificationService.currentType.subscribe(type => this.type = type);
    this.notificationService.isVisible.subscribe(visible => this.visible = visible);
  }

   showNotification() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 3000); // Hide after 3 seconds
  }
}

 

>>>>>>> ededce58ea6eba6ed43bebbc68bc23a5590b3815
