import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { Task } from 'src/app/Task';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() task :Task = {_id: '', name: '', description: '', board_id: '', assigned_to: '', status: '', isArchived: false, created_date:''};
  public isPressed = false;

  constructor(private adminService: AdminService, private popupService: PopupService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  openMore()
  {
    this.isPressed = !this.isPressed;
    setTimeout(() => {
      this.isPressed = false;
    }, 10000)
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

  archiveTask() {
    const task = {...this.task};
    task.isArchived = !this.task.isArchived;
    this.adminService.updateTask(task);
  }
}
