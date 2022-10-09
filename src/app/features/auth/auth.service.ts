import { Injectable } from '@angular/core';
import {delay, Observable, of, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuthorized = false;
  redirectUrl: string = '';

  constructor() {}

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => {
        this.isAuthorized = true;
      })
    );
  }

  logout(): Observable<boolean> {
    return of(false).pipe(
      delay(300),
      tap(() => this.isAuthorized = false)
    );
  }
}
