import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

class MockAuthService {
  isAuthenticated(): boolean {
    // Return true or false based on your test case
    return true;
  }
}

class MockRouter {
  navigate(commands: any[], extras?: any): Promise<boolean> {
    // Mock the navigate method
    return Promise.resolve(true);
  }
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: MockRouter }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow access if the user is authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);

    const canActivateResult: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(true);
    // You can add additional expectations based on your specific requirements
  });

  it('should redirect to login page if the user is not authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');

    const canActivateResult: boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> = guard.canActivate(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot
    );

    expect(canActivateResult).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});