
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7081/'; // Replace with your ASP.NET API endpoint
  private serverErrors: any ;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const credentials = {
      username: username,
      password: password
    };

    // Make a POST request to your API endpoint for authentication
    return this.http.post(`${this.apiUrl}login`, credentials);

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
}
