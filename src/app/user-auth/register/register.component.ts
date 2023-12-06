import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  serverErrors: any = null;
  constructor(private authService: AuthService, private router: Router) { }

  register() {
    // Implement your user registration logic here
    // For simplicity, let's consider the registration successful if username and password are not empty
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }
    this.authService.register(this.username, this.email, this.password).pipe(
      tap((data) => {
        // On successful registration, navigate to the login page
        console.log(data)
        this.router.navigate(['/login']);
      }),
      catchError((error) => {
        this.serverErrors = error;
        throw error;
      })
    ).subscribe();
  }
}
