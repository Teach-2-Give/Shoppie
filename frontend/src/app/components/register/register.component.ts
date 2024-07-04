import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) { }

  onSubmit(registerForm: NgForm) {
    this.clearErrors();

    if (registerForm.invalid) {
      this.errorMessage = 'Please fill all required fields.';
      this.clearErrors();
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Invalid email address.';
      this.clearErrors();
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.errorMessage = 'Invalid password. It must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 8 and 16 characters.';
      this.clearErrors();
      return;
    }

    const user = {
      email: this.email,
      password: this.password,
      name: this.name
    };
    console.log(user);

    this.userService.register(user).subscribe({
      next: data => {
        this.successMessage = 'Registration successful!';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: err => {
        if (err.status === 400) {
          this.errorMessage = err.error.message;
          this.clearErrors();
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          this.clearErrors();
        }
      }
    });
  }

  clearErrors() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 3000);
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,16}$/;
    return passwordRegex.test(password);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
