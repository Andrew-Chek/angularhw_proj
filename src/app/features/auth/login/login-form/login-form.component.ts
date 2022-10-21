import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth.service';
import { map, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  @Output() outResetPassForm = new EventEmitter<boolean>();

  login() {
    this.authService.login().pipe(
      map((token) => {
        window.localStorage.setItem('jwt_token', token.jwt_token)
        this.router.navigateByUrl(this.authService.redirectUrl)
      })).subscribe();
  }
  openForgetPopup()
  {
    this.outResetPassForm.emit(this.authService.setResetFlag());
  }
}
