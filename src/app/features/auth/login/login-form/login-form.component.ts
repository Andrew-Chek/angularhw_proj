import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth.service';
import { map, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  @Output() outResetPassForm = new EventEmitter<boolean>();

  login(email: string, password: string) {
    this.authService.login({email, password}).pipe(
      map((token) => {
        window.localStorage.setItem('jwt_token', token.jwt_token)
        this.router.navigateByUrl(this.authService.redirectUrl)
      })).subscribe();
  }

  openForgetPopup()
  {
    this.authService.setResetFlag()
  }
}
