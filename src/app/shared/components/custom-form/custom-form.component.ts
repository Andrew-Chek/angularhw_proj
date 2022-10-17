import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../features/auth/auth.service';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})

export class CustomFormComponent implements OnInit {
  public fields: {fieldText: string, placeholder: string}[] = [];
  public buttonName: string = ''
  public formName: string = ''
  public close: boolean = true;

  constructor(
    private authService: AuthService
    ) { }

  ngOnInit(): void {
  }

  @Output() sendClose: EventEmitter<string> = new EventEmitter()

  @Input()
  set fieldValues(fields: {fieldText: string, placeholder: string}[]) {
		this.fields = fields;
	}
	get fieldValues(): {fieldText: string, placeholder: string}[] {
    return this.fields;
	}

  @Input()
  set btnName(name: string) {
		this.buttonName = name;
	}
	get btnName(): string {
    return this.buttonName;
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
    this.sendClose.emit(this.formName);
  }

}