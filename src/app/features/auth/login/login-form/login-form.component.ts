import { Component, OnInit } from '@angular/core';
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

  login() {
    this.authService.login().pipe(
      map(() => this.router.navigateByUrl(this.authService.redirectUrl)),
      take(1)
    ).subscribe()
  }
}
