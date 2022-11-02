import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: QuestionBase<string>[] ) {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = this.createControl(question)
    });
    return new FormGroup(group);
  }
  
  createControl(question: QuestionBase<string>)
  {
    if(question.required && question.isEmail)
    {
      return new FormControl(question.value || '', [Validators.required, Validators.email]);
    }
    else if(question.required)
    {
      return new FormControl(question.value || '', Validators.required)
    }
    else {
      return new FormControl(question.value || '');
    }
  }
}