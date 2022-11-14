import { Component, Input} from "@angular/core";
import { Observable } from "rxjs";
import { Board } from "src/app/shared/interfaces/Board";
import { Message } from "src/app/shared/interfaces/Message";

@Component({
	selector: 'app-board',
	template: '<div></div>',
})
export class BoardComponent {
	@Input() board:Board = {_id: '', name:'', description: '', created_date: ''};

	public tasks:Task[] = [];
	public message$:Observable<Message> = new Observable();
	public isPressed:boolean = false;
}