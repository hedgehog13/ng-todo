import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage:string ='';
  constructor(private router: Router, private authService:AuthService) {}
 
  login() {
    // Call the authentication service to perform login
    this.authService.login(this.username, this.password).pipe(
      tap(()=> this.router.navigate(['/my-lists'])),
      catchError((error)=>{
        this.router.navigate(['login']);
        throw error;
      })
    
    ).subscribe()
  }
}
