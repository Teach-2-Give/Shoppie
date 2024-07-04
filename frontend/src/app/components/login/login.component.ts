import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    this.clearErrors();

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    if (!this.validateEmail(this.email)) {
      this.errorMessage = 'Invalid email address.';
      return;
    }

    if (!this.validatePassword(this.password)) {
      this.errorMessage = 'Invalid password. It must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be between 8 and 16 characters.';
      return;
    }

    this.userService.login(this.email, this.password).subscribe({
      next: (data: any) => {
        this.successMessage = 'Login successful!';
        console.log("successfull login");
        
        console.log('Token:', data.token); // Log the token here
        setTimeout(() => {
          this.successMessage = '';

          if(this.email=="adminuser1@example.com"){
            this.router.navigate(['/admin']); 
          }else{
            this.router.navigate(['/user']);
          }
        
        }, 3000);
      },
      error: (err: any) => {
        if (err.status === 401 || err.status === 404) {
          this.errorMessage = err.error.error.message;
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
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

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}