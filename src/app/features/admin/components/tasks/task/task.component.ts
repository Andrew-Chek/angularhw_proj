import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  public task:Task = {_id: '', name: '', description: '', board_id: '', assigned_to: '', status: '', created_date:new Date()};
  public date:string = this.task.created_date.toLocaleDateString();
  public isPressed:boolean = false;
  public openEditTask:boolean = false;
  constructor() { }

  @Input()
  set taskValue(task: Task) {
		this.task = task;
	}
	get taskValue(): Task {
    return this.task;
	}

  ngOnInit(): void {

  }

  openMore()
  {
    this.isPressed = !this.isPressed;
  }
  openEditForm()
  {
    this.openEditTask = !this.openEditTask;
  }

  sendCloseInfo(isClosed: boolean)
  {
    this.openEditTask = isClosed;
  }

}
