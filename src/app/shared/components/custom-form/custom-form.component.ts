import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.scss']
})
export class CustomFormComponent implements OnInit {
  public fields: {fieldText: string, placeholder: string}[] = [];
  public buttonName: string = ''
  public formName: string = ''

  constructor() { }

  ngOnInit(): void {
  }

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

}
