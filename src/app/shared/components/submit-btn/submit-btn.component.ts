import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss']
})
export class SubmitBtnComponent implements OnInit {

	@Input() buttonText:string = ''
	public style = false;
	public submitStyle = !this.style;

	@Input()
	set styleFlag(style: boolean) {
		this.style = style;
		this.submitStyle = !style
	}

	@Output() btnClick = new EventEmitter();

	constructor() {}

	onClick() {
		this.btnClick.emit();
	}
	ngOnInit(): void {
		
	}
}
