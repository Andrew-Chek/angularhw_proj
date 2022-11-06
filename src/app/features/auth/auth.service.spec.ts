import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService, User, Token } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { users } from '../../shared/testingData/usersMock';
import { Message } from 'src/app/Message';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        HttpClient
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  describe('#login', () => {
    const user: User = {email: 'test@email', password: '1234'}

    it('should send proper request', () => {
      service.login(user).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/login`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(user);
    })

    it('should return response of token', () => {
      const token : Token = {jwt_token: '', message: ''}

      service.login(user).subscribe({
        next: data => expect(data.body).toEqual(token),
        error: fail
      })

      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/login`);
      req.flush(token)
    })

    it('should return successful response', () => {
      const loginUser = users[0];
      const successToken : Token = {jwt_token: '', message: ''}
      const errorToken : Token = {jwt_token: '', message: 'No such user'}

      service.login(user).subscribe({
        next: data => {
          expect(data.body).toEqual(successToken)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/login`);
      users.includes(loginUser) ? req.flush(successToken) : req.flush(errorToken);
    })

    it('should return error message', () => {
      const successToken : Token = {jwt_token: '', message: ''}
      const errorToken : Token = {jwt_token: '', message: 'No such user'}

      service.login(user).subscribe({
        next: data => {
          expect(data.body).toEqual(errorToken)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/login`);
      users.includes(user) ? req.flush(successToken) : req.flush(errorToken);
    })
  })

  describe('#register', () => {
    const user: User = {email: 'test@email', password: '1234'}

    it('should send proper request', () => {
      service.register(user).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/register`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(user);
    })

    it('should return response of message', () => {
      const message : Message | null = {isDisplayed: true, message: ''}

      service.register(user).subscribe({
        next: data => expect(data.body).toEqual(message),
        error: fail
      })

      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/register`);
      req.flush(message)
    })

    it('should return success message', () => {
      const successMessage : Message | null = {isDisplayed: true, message: ''}
      const errorMessage : Message | null = {isDisplayed: true, message: 'No such user'}

      service.register(user).subscribe({
        next: data => {
          expect(data.body).toEqual(successMessage)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/register`);
      !users.includes(user) ? req.flush(successMessage) : req.flush(errorMessage);
    })

    it('should return error message', () => {
      const registerUSer = users[0];
      const successMessage : Message | null = {isDisplayed: true, message: ''}
      const errorMessage : Message | null = {isDisplayed: true, message: 'No such user'}

      service.register(registerUSer).subscribe({
        next: data => {
          expect(data.body).toEqual(errorMessage)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/register`);
      !users.includes(registerUSer) ? req.flush(successMessage) : req.flush(errorMessage);
    })
  })

  describe('#forget', () => {
    const user: User = {email: 'test@email', password: '1234'}

    it('should send proper request', () => {
      service.forget(user).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/forgot_password`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({email: user.email});
    })

    it('should return response of message', () => {
      const message : Message | null = {isDisplayed: true, message: ''}

      service.forget(user).subscribe({
        next: data => expect(data.body).toEqual(message),
        error: fail
      })

      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/forgot_password`);
      req.flush(message)
    })

    it('should return success message', () => {
      const successUser = users[0];
      const successMessage : Message | null = {isDisplayed: true, message: 'New password sent to your email address'}
      const errorMessage : Message | null = {isDisplayed: true, message: `Email isn't correct`}

      service.forget(successUser).subscribe({
        next: data => {
          expect(data.body).toEqual(successMessage)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/forgot_password`);
      users.includes(successUser) ? req.flush(successMessage) : req.flush(errorMessage);
    })

    it('should return error message', () => {
      const successMessage : Message | null = {isDisplayed: true, message: 'New password sent to your email address'}
      const errorMessage : Message | null = {isDisplayed: true, message: `Email isn't correct`}

      service.forget(user).subscribe({
        next: data => {
          expect(data.body).toEqual(errorMessage)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${service.apiUrl}/auth/forgot_password`);
      users.includes(user) ? req.flush(successMessage) : req.flush(errorMessage);
    })
  })

  describe('#logout', () => {
    window.localStorage.setItem('jwt_token', 'test_token');
    it('should change isAuthorized and jwt_token in local storage', () => {
      service.logout().subscribe({
        next: data => {
          expect(window.localStorage.getItem('jwt_token')).toEqual('')
          expect(service.isAuthorized).toEqual(false)
          expect(data).toBeFalse()
        },
        error: fail
      })
    })
  })

  describe('#setResetFlag', () => {
    it('should set resetFlag to true and update state in service', () => {
      service.resetFlag = false;
      service.setResetFlag();
      expect(service.resetFlag).toEqual(true);
      expect(service.openSubject.getValue()).toEqual({reset: true, register: false, open : true});
    })

    it('should set resetFlag to false and update state in service', () => {
      service.resetFlag = true;
      service.setResetFlag();
      expect(service.resetFlag).toEqual(false);
      expect(service.openSubject.getValue()).toEqual({reset: false, register: false, open : false});
    })
  })

  describe('#setRegisterFlag', () => {
    it('should set registerFlag to true and update state in service', () => {
      service.registerFlag = false;
      service.setRegisterFlag();
      expect(service.registerFlag).toEqual(true);
      expect(service.openSubject.getValue()).toEqual({reset: false, register: true, open : true});
    })

    it('should set registerFlag to false and update state in service', () => {
      service.registerFlag = true;
      service.setRegisterFlag();
      expect(service.registerFlag).toEqual(false);
      expect(service.openSubject.getValue()).toEqual({reset: false, register: false, open : false});
    })
  })

  describe('#setRequestMessage', () => {
    it('should set isDisplayed to true and update state in service', () => {
      service.isDisplayed = false;
      service.setRequestMessage('');
      expect(service.isDisplayed).toEqual(true);
      expect(service.messageSubject.getValue()).toEqual({isDisplayed: true, message: '', error: false});
    })

    it('should set isDisplayed to false and update state in service', () => {
      service.isDisplayed = true;
      service.setRequestMessage('tested message');
      expect(service.isDisplayed).toEqual(false);
      expect(service.messageSubject.getValue()).toEqual({isDisplayed: false, message: 'tested message', error: false});
    })
  })

  describe('#closeMessage', () => {
    it('should set isDisplayed to false and update state in service', () => {
      service.isDisplayed = true;
      service.closeMessage();
      expect(service.isDisplayed).toEqual(false);
      expect(service.messageSubject.getValue()).toEqual({isDisplayed: false, message: '', error: false});
    })
  })
});
