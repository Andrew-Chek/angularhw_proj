import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Board } from "../../interfaces/Board";

@Component({
    selector: 'app-board-form',
    template: '<div></div>',
})
export class BoardFormComponent {
    protected board: Board = {_id:'', name: '', description: '', created_date: ''};
    @Input() submitText:string = '';
  
    @Output() sentData = new EventEmitter<Board>;
}