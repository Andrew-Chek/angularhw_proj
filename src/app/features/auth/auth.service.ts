import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, delay, Observable, of, tap, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Message } from 'src/app/shared/interfaces/Message';
import { Board } from 'src/app/shared/interfaces/Board';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuthorized = false;
  redirectUrl: string = '/dashboard';
  apiUrl = 'https://n-npb6.onrender.com/api'
  resetFlag = false;
  registerFlag = false;
  isDisplayed = false;
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
          this.setRequestMessage(error.error.message)
          this.isDisplayed = !this.isDisplayed;
          this.messageSubject.next({isDisplayed: this.isDisplayed, message: error.error.message as string, error: true})
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
          this.isDisplayed = !this.isDisplayed;
          this.messageSubject.next({isDisplayed: this.isDisplayed, message: error.error.message as string, error: true})
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
    this.isDisplayed = !this.isDisplayed;
    this.messageSubject.next({isDisplayed: this.isDisplayed, message: message, error: false})
  }

  closeMessage()
  {
    this.isDisplayed = false;
    this.messageSubject.next({isDisplayed: false, message: '', error: false})
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