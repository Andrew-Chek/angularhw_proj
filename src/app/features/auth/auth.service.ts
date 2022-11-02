import { Injectable } from '@angular/core';
import {BehaviorSubject, delay, Observable, of, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/Message';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuthorized = false;
  redirectUrl: string = '/admin';
  resetFlag = false;
  registerFlag = false;
  openSubject = new BehaviorSubject<{reset: boolean, register: boolean, open : boolean}>({reset: false, register: false, open: false});

  constructor(private http: HttpClient) {}

  login(user: User): Observable<Token> {
    this.isAuthorized=true;
    return this.http.post<Token>(
      'http://localhost:8080/api/auth/login', 
      {email: user.email, password: user.password})
  }

  register(user: User): Observable<Message> {
    return this.http.post<Message>(
      'http://localhost:8080/api/auth/register', 
      {email: user.email, password: user.password})
  }

  forget(user: User): Observable<Message> {
    return this.http.post<Message>(
      'http://localhost:8080/api/auth/forgot_password', 
      {email: user.email})
  }

  logout(): Observable<boolean> {
    return of(false).pipe(
      tap(() => {
        this.isAuthorized = false;
        window.localStorage.setItem('jwt_token', '');
      })
    );
  }

  setResetFlag()
  {
    this.resetFlag = !this.resetFlag;
    this.openSubject.next({reset: this.resetFlag, register: false, open : this.resetFlag})
  }

  setRegisterFlag()
  {
    this.registerFlag = !this.registerFlag
    this.openSubject.next({reset: false, register: this.registerFlag, open : this.registerFlag})
  }
}

export interface Token{
  jwt_token:string;
  message: string;
}

export interface User{
  email: string,
  password: string
}