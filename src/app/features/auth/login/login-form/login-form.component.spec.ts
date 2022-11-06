import { HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SubmitBtnComponent } from 'src/app/shared/testingData/componentMocks/submitMock';
import { AuthService, User, Token } from '../../auth.service';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let authServiceStab: Partial<AuthService> = {
    login: (user: User) => { 
      const token: Token = {message: '', jwt_token: 'tested_token'};
      const response: HttpResponse<Token> = new HttpResponse({body: token})
      return of(response)
    },
    setResetFlag: () => {}
  }
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        LoginFormComponent,
        SubmitBtnComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceStab}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    spyOn<any>(authServiceStab, 'login')
    spyOn<any>(authServiceStab, 'setResetFlag')

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#openForgetPopup', () => {
    it('should raise openForgetPopup after click', () => {
      const openBtn = fixture.debugElement.query(By.css('.form-btn'));
      openBtn.triggerEventHandler('click');
      expect(authServiceStab.setResetFlag).toHaveBeenCalled()
    })
  })

  describe('#login', () => {
    it('should raise login after click, because data is correct', () => {
      const loginBtn = fixture.debugElement.query(By.css('.login-btn'));
      component.loginForm.get('email')!.setValue('test@email');
      fixture.detectChanges();
      component.loginForm.get('password')!.setValue('test password');
      fixture.detectChanges();
      loginBtn.triggerEventHandler('click');
      expect(authServiceStab.login).toHaveBeenCalled()
    })
    it('should detect errors, because data is not correct', () => {
      const loginBtn = fixture.debugElement.query(By.css('.login-btn'));
      component.loginForm.get('email')!.setValue('test email');
      fixture.detectChanges();
      component.loginForm.get('password')!.setValue('test password');
      fixture.detectChanges();
      loginBtn.triggerEventHandler('click');
      expect(authServiceStab.login).not.toHaveBeenCalled()
      expect(component.loginForm.get('email')?.errors).not.toBeNull()
    })
  })
});
