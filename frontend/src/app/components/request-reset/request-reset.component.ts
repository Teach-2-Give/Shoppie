import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-request-reset',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './request-reset.component.html',
  styleUrl: './request-reset.component.css'
})
export class RequestResetComponent {
  email: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private userService: UserService) { }

  requestPasswordReset(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.userService.requestPassReset(this.email).subscribe({
      next: (response) => {
        this.successMessage = 'Password reset email sent.';
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Failed to send password reset email.';
        this.successMessage = null;
      }
    });
  }
}
