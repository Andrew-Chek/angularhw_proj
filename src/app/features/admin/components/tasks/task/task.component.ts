import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { map, of, Subscription, take } from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/popup.service';
import { Task } from 'src/app/Task';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  public task:Task = {_id: '', name: '', description: '', board_id: '', assigned_to: '', status: '', created_date:''};
  public isPressed:boolean = false;

  constructor(private adminService: AdminService, private popupService: PopupService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  @Input()
  set taskValue(task: Task) {
		this.task = task;
	}
	get taskValue(): Task {
    return this.task;
	}

  openMore()
  {
    this.isPressed = !this.isPressed;
  }
  
  openEditTaskForm()
  {
    this.adminService.getBoard(this.task.board_id).subscribe();
    this.adminService.setCurrentTask({...this.task});
    this.popupService.openEditTaskForm();
  }

  openDeleteTaskForm()
  {
    this.adminService.getBoard(this.task.board_id).subscribe();
    this.adminService.setCurrentTask({...this.task});
    this.popupService.openDeleteTaskForm();
  }

}
