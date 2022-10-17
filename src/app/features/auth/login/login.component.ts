import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public checkRegister:boolean = false;
  public checkReset:boolean = false;
  constructor(
    private authService: AuthService,
  ) 
  {
    this.checkRegister = this.authService.registerFlag;
    this.checkReset = this.authService.resetFlag;
  }
  ngOnInit(): void {
  }

  openRegisterPopup()
  {
    this.checkRegister = this.authService.setRegisterFlag();
  }
  openResetPopup(checkReset:boolean)
  {
    this.checkReset = checkReset;
  }
  sendCloseInfo(formName: string)
  {
    if(formName == 'Sign Up Form')
    {
      this.checkRegister = this.authService.setRegisterFlag();
    }
    else if(formName == 'Reset Password Form')
    {
      this.checkReset = this.authService.setResetFlag();
    }
  }
}
