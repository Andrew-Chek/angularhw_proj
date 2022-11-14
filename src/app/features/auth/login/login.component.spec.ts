import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { Message } from 'src/app/shared/interfaces/Message';
import { CustomFormComponent } from 'src/app/shared/testingData/componentMocks/customFormMock';
import { LoginFormComponent } from 'src/app/shared/testingData/componentMocks/loginFormMock';
import { MessageComponent } from 'src/app/shared/testingData/componentMocks/messageMock';
import { SubmitBtnComponent } from 'src/app/shared/testingData/componentMocks/submitMock';
import { AuthService, User } from '../auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStab: Partial<AuthService> = {
    openSubject: new BehaviorSubject<{reset: boolean, register: boolean, open: boolean}>({reset: true, register: true, open: false}),
    messageSubject: new BehaviorSubject<{isDisplayed: boolean, message: string, error: boolean}>({isDisplayed: false, message: 'value', error: false}), 
    register: (user: User) => { 
      const message: Message = {message: 'test message', isDisplayed: false};
      const response: HttpResponse<Message> = new HttpResponse({body: message})
      return of(response)
    },
    forget: (user: User) => {
      const message: Message = {message: 'test message', isDisplayed: false};
      const response: HttpResponse<Message> = new HttpResponse({body: message})
      return of(response)
    },
    setRequestMessage: (message: string) => {},
    setRegisterFlag: () => {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LoginComponent,
        MessageComponent,
        SubmitBtnComponent,
        CustomFormComponent,
        LoginFormComponent
      ],
      providers: [
        {provide: AuthService, useValue: authServiceStab}
      ]
    })
    .compileComponents();

    spyOn<any>(authServiceStab, 'setRegisterFlag');
    spyOn<any>(authServiceStab, 'setRequestMessage');

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#OpenRegisterPopup', () => {
    it('should raise openRegisterPopup after click', () => {
      const openBtn = fixture.debugElement.query(By.css('.register-btn'));
      openBtn.triggerEventHandler('click');
      expect(authServiceStab.setRegisterFlag).toHaveBeenCalled()
    })
  })

  describe('#sendRegisterRequest', () => {
    it('should raise register method in authService after click', () => {
      component.sendRegisterRequest({email: 'test email', password: 'test password', newPassword: 'new password'});
      expect(authServiceStab.setRequestMessage).toHaveBeenCalled()
    })
  })

  describe('#sendResetRequest', () => {
    it('should raise forget method in authService after click', () => {
      component.sendResetRequest({email: 'test email', password: 'test password', newPassword: 'new password'});
      expect(authServiceStab.setRequestMessage).toHaveBeenCalled()
    })
  })

  describe('#changeReset according to authState', () => {
    it('change reset nad register flags according to authState', () => {
      expect(component.checkRegister).toBeTrue();
      expect(component.checkReset).toBeTrue();
    })
  })
});
