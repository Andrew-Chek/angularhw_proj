import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Task } from "../../interfaces/Task";

@Component({
    selector: 'app-task-form',
    template: '<div></div>',
})
export class TaskFormComponent {
    @Input() submitText = '';

    @Output() sentData = new EventEmitter<Task>;

    public statuses:string[] = ['To do', 'In progress', 'Done']
    public readonlyFlag = false;
    public visible = false;
    public task:Task = {_id: '', name: '', description: '', status: 'To do', board_id: '', assigned_to: '', comments: [], isArchived: false, created_date: ''};
}