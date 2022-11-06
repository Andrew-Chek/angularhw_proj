import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-submit-btn',
    template: '<ul></ul>',
})
export class SubmitBtnComponent {
    @Input() buttonText:string = ''
	@Input() style = false;

	@Output() btnClick = new EventEmitter();
}