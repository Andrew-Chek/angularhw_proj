import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../features/auth/auth.service';
import { QuestionBase } from '../../services/question-control/question-base';
import { QuestionControlService } from '../../services/question-control/question-control.service';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss'],
  providers: [QuestionControlService]
})

export class CustomFormComponent implements OnInit {
  @ViewChildren('fieldName') fieldNames!: QueryList<ElementRef>;

  @Input() questions!: QuestionBase<string>[];
  @Input() buttonName: string = '';
  @Input() formName: string = '';

  @Output() sentData: EventEmitter<{email: string, password: string, newPassword: string}> = new EventEmitter()

  public customForm! : FormGroup<FormControl[]>;
  public isOpened = false;
  public isRegister = false;
  public email: string = '';
  public password: string = '';
  public newPassword: string = '';
  public errorsChecked = false;

  constructor(private authService: AuthService, private questionControlService: QuestionControlService) { }

  ngOnInit(): void {
    this.authService.openSubject.subscribe(value => {
      this.isRegister = value.register;
      this.isOpened = value.open;
    })
  }

  sendData()
  {
    const user = {email: '', password: '', newPassword: ''}
    this.questions.forEach(question => {
      const errors = this.customForm.get(question.key)?.errors;
      if(errors != null)
      {
        this.errorsChecked = true;
        return;
      }
    })
    if(!this.errorsChecked)
    {
      const fields = this.fieldNames.toArray();
      user.email = fields[0].nativeElement.value;
      user.password = fields[1]?.nativeElement.value;
      user.newPassword = fields[2]?.nativeElement.value;
      this.sentData.emit(user)
      this.closePopup();
    }
  }

  closePopup()
  {
    const fields = this.fieldNames.toArray();
    fields[0].nativeElement.value = '';
    if(fields[1] != undefined)
    {
      fields[1].nativeElement.value = '';
    }
    if(fields[2] != undefined)
    {
      fields[2].nativeElement.value = '';
    }
    if(this.isRegister)
    {
      this.authService.setRegisterFlag()
    }
    else {
      this.authService.setResetFlag()
    }
  }

}