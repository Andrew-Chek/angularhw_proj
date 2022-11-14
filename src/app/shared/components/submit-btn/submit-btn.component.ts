import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmitBtnComponent implements OnInit {

	@Input() buttonText:string = ''
	@Input() style = false;

	@Output() btnClick = new EventEmitter();

	constructor() {}

	onClick() {
		this.btnClick.emit();
	}
	ngOnInit(): void {
		
	}
}
