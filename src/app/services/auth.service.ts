
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7081/'; // Replace with your ASP.NET API endpoint
  private serverErrors: any ;
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const credentials = {
      username: username,
      password: password
    };

    // Make a POST request to your API endpoint for authentication
    return this.http.post(`${this.apiUrl}login`, credentials).pipe(
      tap((response: any) => {
        // Assuming the server responds with a token upon successful login
        const token = response.token;

        // Store the token in local storage
        localStorage.setItem('token', token);
      })
    );

  }
  register(username: string, email: string, password: string): Observable<any> {
    const newUser = {
      username: username,
      email: email,
      password: password
    };
    // return this.http.get(`${this.apiUrl}/data`).pipe(
    //   catchError((error: HttpErrorResponse) => this.handleError(error))
    // );
    // Make a POST request to your API endpoint for user registration
    return this.http.post(`${this.apiUrl}register`, newUser).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      this.serverErrors = error.error;
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      return throwError(() => this.serverErrors)
    }

    // Emit a custom error message or the original error object

    return throwError(() => new Error('Something went wrong. Please try again later.'))
  }


  private tokenKey = 'token'; // Replace with the key you use to store the token

  isAuthenticated(): boolean {
    // Check if the token is present and not expired
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      // Decode the token and check the expiration
      const decodedToken = this.decodeToken(token);

      // Check if the token is not expired
      return decodedToken.exp && decodedToken.exp * 1000 > Date.now();
    }

    return false;
  }
  private decodeToken(token: string): any {
    try {
      // JWTs are base64-encoded, so we need to decode them
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c: any) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return {};
    }
  }
   logout(): void {
    // Clear the authentication token from local storage
    localStorage.removeItem(this.tokenKey);

     this.router.navigate(['/login']);
   
  }
  getUsername(): string | null {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      const decodedToken = this.decodeToken(token);

      // Assuming your token contains a 'sub' (subject) claim with the username
      return decodedToken.unique_name || null;
    }

    return null;
  }
}
