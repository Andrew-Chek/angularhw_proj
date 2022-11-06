import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { QuestionBase } from '../../services/question-control/question-base';
import { QuestionControlService } from '../../services/question-control/question-control.service';

import { CustomFormComponent } from './custom-form.component';

describe('CustomFormComponent', () => {
  let component: CustomFormComponent;
  let fixture: ComponentFixture<CustomFormComponent>;
  let authServiceStab: Partial<AuthService> = {
    openSubject: new BehaviorSubject<{reset: boolean, register: boolean, open: boolean}>({reset: false, register: false, open: false}),
    setRegisterFlag: () => {},
    setResetFlag: () => {}
  }
  let questionControlServiceStab: Partial<QuestionControlService> = {
    toFormGroup: (questions: QuestionBase<string>[]) => {
      return new FormGroup({
        email: new FormControl('', [
          Validators.required,
          Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ])})
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStab},
        {provide: QuestionControlService, useValue: questionControlServiceStab}
      ]
    })
    .compileComponents();

    spyOn<any>(authServiceStab, 'setRegisterFlag')
    spyOn<any>(authServiceStab, 'setResetFlag')

    fixture = TestBed.createComponent(CustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.questions = [
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
    component.customForm = questionControlServiceStab.toFormGroup!(component.questions);
    fixture.detectChanges();
  });

  describe('#closePopup', () => {
    it('should raise closePopup for registration after click', () => {
      component.isRegister = true;
      fixture.detectChanges();
      const closeBtn = fixture.debugElement.query(By.css('.custom-icon'));
      closeBtn.triggerEventHandler('click');
      expect(authServiceStab.setRegisterFlag).toHaveBeenCalled()
    })

    it('should raise closePopup for reset password after click', () => {
      component.isRegister = false;
      fixture.detectChanges();
      const closeBtn = fixture.debugElement.query(By.css('.custom-icon'));
      closeBtn.triggerEventHandler('click');
      expect(authServiceStab.setResetFlag).toHaveBeenCalled()
    })
  })

  describe('#formWork', () => {
    it('test a form group element count', () => {
      const formElement = fixture.debugElement.nativeElement.querySelector('.custom')
      const inputElements = formElement.querySelectorAll('.custom-input')
      expect(inputElements.length).toEqual(2)
    })

    it('check initial form values', () => {
      const formGroup = component.customForm;
      const formValues: any = {
        email: '',
        password: '',
      }
      expect(formGroup.value).toEqual(formValues);
    })

    it('check input values when entering data', () => {
      const formElement = fixture.debugElement.nativeElement.querySelector('.custom')
      const emailElement = formElement.querySelectorAll('.custom-input')[0]
      emailElement.value = 'test value';
      const formGroupEmail: AbstractControl<string> = component.customForm.get('email')!;
      formGroupEmail.setValue('test value');
      expect(formGroupEmail?.value).toEqual(emailElement.value)
    })
  })
});
