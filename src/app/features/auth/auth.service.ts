import { Injectable } from '@angular/core';
import {delay, Observable, of, tap} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuthorized = false;
  redirectUrl: string = '/admin';
  resetFlag: boolean = false;
  registerFlag: boolean = false;

  constructor(private http: HttpClient) {}

  login(): Observable<Token> {
    this.isAuthorized=true;
    return this.http.post<Token>(
      'http://localhost:8080/api/auth/login', 
      {email:'andrii_chekurda@epam.com', password:'1234'})
  }

  logout(): Observable<boolean> {
    return of(false).pipe(
      delay(300),
      tap(() => this.isAuthorized = false)
    );
  }
  setResetFlag(): boolean
  {
    this.resetFlag = !this.resetFlag;
    return this.resetFlag;
  }
  setRegisterFlag(): boolean
  {
    this.registerFlag = !this.registerFlag;
    return this.registerFlag;
  }
}

export class Token{
  constructor(token:string){
    this.jwt_token = token
  }
  public jwt_token:string;
}

