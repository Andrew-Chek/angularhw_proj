import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, ElementRef} from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
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
  public questions!: QuestionBase<string>[];
  public customForm! : FormGroup;
  public buttonName: string = ''
  public formName: string = ''
  public isOpened = false;
  public isRegister = false;
  public email: string = ''
  public password: string = ''
  public newPassword: string = ''

  @ViewChildren('fieldName') fieldNames!: QueryList<ElementRef>;

  constructor(private authService: AuthService, private questionControlService: QuestionControlService) { }

  ngOnInit(): void {
    this.authService.openSubject.subscribe(value => {
      this.isRegister = value.register;
      this.isOpened = value.open;
    })
  }

  @Output() sentData: EventEmitter<{email: string, password: string, newPassword: string}> = new EventEmitter()

  @Input()
  set questionValues(questions: QuestionBase<string>[]) {
		this.questions = questions;
    this.customForm = this.questionControlService.toFormGroup(this.questions);
	}
	get questionValues(): QuestionBase<string>[] {
    return this.questions;
	}

  @Input()
  set btnName(name: string) {
		this.buttonName = name;
	}
	get btnName(): string {
    return this.buttonName;
	}

  sendData()
  {
    const user = {email: '', password: '', newPassword: ''}
    const fields = this.fieldNames.toArray();
    user.email = fields[0].nativeElement.value;
    user.password = fields[1]?.nativeElement.value;
    user.newPassword = fields[2]?.nativeElement.value;
    this.sentData.emit(user)
    this.closePopup();
  }

  @Input()
  set form(form: string) {
		this.formName = form;
	}
	get form(): string {
    return this.formName;
	}

  closePopup()
  {
    if(this.isRegister)
    {
      this.authService.setRegisterFlag()
    }
    else {
      this.authService.setResetFlag()
    }
  }

}