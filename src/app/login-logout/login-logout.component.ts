import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.scss']
})
export class LoginLogoutComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
   
    this.isLoggedIn = this.authService.isAuthenticated();

    // If the user is logged in, get and display the username
    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
    }
  }

  logout() {
    // Implement your logout logic, e.g., clear user data, navigate to logout endpoint, etc.
    this.authService.logout();
    this.isLoggedIn = false;
    this.username = null;
  }
}
