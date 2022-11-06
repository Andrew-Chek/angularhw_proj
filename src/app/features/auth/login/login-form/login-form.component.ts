import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  public loginForm:FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get email() { return this.loginForm.get('email'); }

  get password() { return this.loginForm.get('password'); }

  login() {
    if(this.email?.errors == null && this.password?.errors == null)
    {
      const email = this.email?.value;
      const password = this.password?.value;
      this.authService.login({email, password})
      .subscribe(token => {
          window.localStorage.setItem('jwt_token', token.body!.jwt_token)
          this.router.navigateByUrl(this.authService.redirectUrl)
      });
    }
  }

  openForgetPopup()
  {
    this.authService.setResetFlag()
  }
}
