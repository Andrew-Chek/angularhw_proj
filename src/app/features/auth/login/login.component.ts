import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { QuestionBase } from 'src/app/shared/services/question-control/question-base';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public checkRegister:boolean = false;
  public checkReset:boolean = false;
  public message = ''
  public isDisplayed = false;

  public registerQuestions : QuestionBase<string>[] = [
    new QuestionBase<string>({
      key: 'emailValue',
      label: 'Email',
      value: '',
      required: true,
      isEmail: true,
      order: 1,
      placeholder: 'andrii_chekurda@epam.com',
      type: 'email',
    }), 
    new QuestionBase<string>({
        key: 'passwordValue',
        label: 'Password',
        value: '',
        required: true,
        isEmail: false,
        order: 2,
        placeholder: '1234',
        type: 'password',
    })]

  public resetQuestions : QuestionBase<string>[] = [
    new QuestionBase<string>({
      key: 'resetEmail',
      label: 'Email for reseting password',
      value: '',
      required: true,
      isEmail: true,
      order: 1,
      placeholder: 'andrii_chekurda@epam.com',
      type: 'email',
    })]
  
  constructor(private authService: AuthService) 
  {
    this.checkRegister = this.authService.registerFlag;
    this.checkReset = this.authService.resetFlag;
  }
  
  ngOnInit(): void {
    this.authService.openSubject.subscribe(value => {
      this.checkRegister = value.register;
      this.checkReset = value.reset;
    })
    this.authService.messageSubject.subscribe(value => {
      this.isDisplayed = value.isDisplayed;
    })
  }

  openRegisterPopup()
  {
    this.authService.setRegisterFlag();
  }

  openResetPopup()
  {
    this.authService.setResetFlag();
  }

  sendRegisterRequest(user: {email: string, password: string, newPassword: string})
  {
    this.authService.register(user)
    .pipe(
      map(value => {
        this.authService.setRequestMessage(value.body!.message)
    })).subscribe()
  }

  sendResetRequest(user: {email: string, password: string, newPassword: string})
  {
    this.authService.forget(user)
    .pipe(
      map(value => {
        this.authService.setRequestMessage(value.body!.message)
    })).subscribe()
  }
}
