import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthentication();
  }
  private checkAuthentication(): boolean| UrlTree{
    // Implement your authentication check here
    // For simplicity, let's consider the user as authenticated if a token is present (you should replace this with your actual authentication logic)
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (isAuthenticated) {
      return true;
    } else {
      // Navigate to the login page if not authenticated
      return this.router.createUrlTree(['/login']);
    }
  }
}