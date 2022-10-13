import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss']
})
export class SubmitBtnComponent implements OnInit {

  public buttonText:string = ''
  @Input()
	set text(name: string) {
		this.buttonText = name;
	}
	get text(): string {
	return this.buttonText;
	}

	@Output() btnClick = new EventEmitter();

	constructor() {}

	onClick() {
		this.btnClick.emit();
	}
  ngOnInit(): void {
    
  }

}
