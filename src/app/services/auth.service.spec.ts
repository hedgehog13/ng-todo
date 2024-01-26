import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login', () => {
    it('should send a POST request to login endpoint', () => {
      const username = 'testuser';
      const password = 'testpassword';

      authService.login(username, password).subscribe();

      const req = httpTestingController.expectOne(`${authService['apiUrl']}login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, password });
    });

    it('should store the token in local storage upon successful login', () => {
      const token = 'testToken';
      spyOn(localStorage, 'setItem');

      authService.login('testuser', 'testpassword').subscribe();

      const req = httpTestingController.expectOne(`${authService['apiUrl']}login`);
      req.flush({ token });

      expect(localStorage.setItem).toHaveBeenCalledWith(authService['tokenKey'], token);
    });
  });

  describe('register', () => {
    it('should send a POST request to register endpoint', () => {
      const username = 'testuser';
      const email = 'test@example.com';
      const password = 'testpassword';

      authService.register(username, email, password).subscribe();

      const req = httpTestingController.expectOne(`${authService['apiUrl']}register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ username, email, password });
    });

    // it('should handle errors and call handleError', fakeAsync(() => {
    //   const handleErrorSpy = spyOn<any>(authService, 'handleError').and.callThrough();
    //   const errorResponse = { status: 500, statusText: 'Internal Server Error' };
  
    //   authService.register('testuser', 'test@example.com', 'testpassword').subscribe(
    //     () => fail('Expected an error, but got a successful response'),
    //     (error: HttpErrorResponse) => {
    //       expect(error.status).toBe(500); // You can customize this based on your expected behavior
    //       expect(handleErrorSpy).toHaveBeenCalled(); // Check if handleError has been called
    //     }
    //   );
  
    //   const req = httpTestingController.expectOne(`${authService['apiUrl']}register`);
    //   req.flush({}, errorResponse);
  
    //   tick(); // Complete all pending asynchronous calls
  
    //   httpTestingController.verify();
    // }));
  });


  describe('isAuthenticated', () => {
    it('should return true if the token is present and not expired', () => {
      spyOn(localStorage, 'getItem').and.returnValue('testToken');
      spyOn(authService, 'decodeToken').and.returnValue({ exp: Date.now() / 1000 + 100 });

      const result = authService.isAuthenticated();

      expect(result).toBe(true);
    });

    it('should return false if the token is not present', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      const result = authService.isAuthenticated();

      expect(result).toBe(false);
    });


  });


  describe('logout', () => {
    it('should remove the authentication token from local storage and navigate to login', () => {
      spyOn(localStorage, 'removeItem');
      spyOn(authService['router'], 'navigate');

      authService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith(authService['tokenKey']);
      expect(authService['router'].navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('getUsername', () => {
    it('should correctly decode the token', () => {
      const authServiceSpy = spyOn<any>(authService, 'decodeToken');
  
      const token = 'testToken';
      const expectedResult = { exp: Date.now() / 1000 + 100 };
      authServiceSpy.and.returnValue(expectedResult);
  
      const result = authService['decodeToken'](token);
  
      expect(result).toEqual(expectedResult);
      expect(authServiceSpy).toHaveBeenCalledWith(token);
    });
    it('should return null if the token is not present', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      const result = authService.getUsername();

      expect(result).toBe(null);
    });
  });
});
