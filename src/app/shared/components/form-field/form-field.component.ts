import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {

  public fieldText = '';
  public placeholder = '';

	@Input()
	set text(name: string) {
		this.fieldText = name;
	}
	get text(): string {
    return this.fieldText;
	}
  
	@Input()
	set inpPlaceholder(placeholder: string) {
		this.placeholder = placeholder;
	}
	get inpPlaceholder(): string {
    return this.placeholder;
	}

  constructor() { }

  ngOnInit(): void {
  }

}
