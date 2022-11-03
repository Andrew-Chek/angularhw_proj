import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, delay, Observable, of, tap, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Message } from 'src/app/Message';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuthorized = false;
  redirectUrl: string = '/admin';
  apiUrl = 'http://localhost:8080/api'
  resetFlag = false;
  registerFlag = false;
  openSubject = new BehaviorSubject<{reset: boolean, register: boolean, open : boolean}>({reset: false, register: false, open: false});
  messageSubject = new BehaviorSubject({isDisplayed: false, message: 'value', error: false})

  constructor(private http: HttpClient) {}

  login(user: User): Observable<HttpResponse<Token>> {
    this.isAuthorized=true;
    return this.http.post<Token>(
      `${this.apiUrl}/auth/login`, 
      {email: user.email, password: user.password}, {
        observe: 'response'
      }).pipe(
        catchError((error) => {
          this.messageSubject.next({isDisplayed: true, message: error.error.message as string, error: true})
          return throwError(() => {new Error('Something bad happened; please try again later.')})
      }))
  }

  register(user: User): Observable<HttpResponse<Message>> {
    return this.http.post<Message>(
      `${this.apiUrl}/auth/register`, 
      {email: user.email, password: user.password}, {
        observe: 'response'
      }).pipe(
        catchError((error) => {
          this.messageSubject.next({isDisplayed: true, message: error.error.message as string, error: true})
          return throwError(() => {new Error('Something bad happened; please try again later.')})
      }))
  }

  forget(user: User): Observable<HttpResponse<Message>> {
    return this.http.post<Message>(
      `${this.apiUrl}/auth/forgot_password`, 
      {email: user.email}, {
        observe: 'response'
      }).pipe(
        catchError((error) => {
          this.messageSubject.next({isDisplayed: true, message: error.error.message as string, error:true})
          return throwError(() => {new Error('Something bad happened; please try again later.')})
      }))
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

  setRequestMessage(message: string)
  {
    this.messageSubject.next({isDisplayed: true, message: message, error: false})
  }

  closeMessagePopup()
  {
    this.messageSubject.next({isDisplayed: false, message: '', error: false});
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