import { TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';
import { QuestionBase } from './question-base';

import { QuestionControlService } from './question-control.service';

describe('QuestionControlService', () => {
  let service: QuestionControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuestionControlService
      ]
    });
    service = TestBed.inject(QuestionControlService);
  });

  describe('#createControl', () => {
    it('create proper control with expected validators', () => {
      const control = new QuestionBase<string>({required: true, isEmail: true})
      const formControl = service.createControl(control)
      expect(formControl.hasValidator(Validators.required)).toEqual(true);
      expect(formControl.hasValidator(Validators.email)).toEqual(true);
    })

    it('create proper control with required validator', () => {
      const control = new QuestionBase<string>({required: true})
      const formControl = service.createControl(control)
      expect(formControl.hasValidator(Validators.required)).toEqual(true);
      expect(formControl.hasValidator(Validators.email)).toEqual(false);
    })

    it('create proper control with no validators', () => {
      const control = new QuestionBase<string>()
      const formControl = service.createControl(control)
      expect(formControl.hasValidator(Validators.required)).toEqual(false);
      expect(formControl.hasValidator(Validators.email)).toEqual(false);
    })
  })
  describe('#toFormGroup', () => {
    it('create proper controls in formGroup', () => {
      const questins: QuestionBase<string>[] = [
        new QuestionBase<string>({ required: true, isEmail: true, key: 'email' }), 
        new QuestionBase<string>({ required: true, key: 'password' })
      ]
      const formGroup = service.toFormGroup(questins)
      expect(formGroup.value).toEqual({
        email: '',
        password: ''
      });
    })

    it('create empty formGroup', () => {
      const formGroup = service.toFormGroup([])
      expect(formGroup.value).toEqual({});
    })
  })
});
