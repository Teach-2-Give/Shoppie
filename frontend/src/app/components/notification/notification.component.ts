import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-notification',
  standalone: true,
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

 

