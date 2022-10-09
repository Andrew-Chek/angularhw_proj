import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-btn',
  templateUrl: './account-btn.component.html',
  styleUrls: ['./account-btn.component.scss']
})
export class AccountBtnComponent implements OnInit {
  public buttonText = '';

	@Input()
	set text(name: string) {
		this.buttonText = name;
	}
	get name(): string {
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
