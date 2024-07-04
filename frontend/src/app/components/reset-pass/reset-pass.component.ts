import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-pass',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.token = this.route.snapshot.queryParams['token'];
  }

  resetPassword(form: NgForm) {
    if (form.invalid || this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.userService.resetPassword(this.token, this.newPassword).subscribe({
      next: (response) => {
        this.successMessage = 'Password reset successful.';
        this.errorMessage = null;
      },
      error: (error) => {
        this.errorMessage = 'Failed to reset password.';
        this.successMessage = null;
      }
    });
  }
}
