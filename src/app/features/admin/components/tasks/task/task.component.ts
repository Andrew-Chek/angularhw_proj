import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { Task } from 'src/app/Task';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() task :Task = {_id: '', name: '', description: '', board_id: '', assigned_to: '', comments: [], status: '', isArchived: false, created_date:''};
  public isPressed = false;

  constructor(private adminService: AdminService, 
    private popupService: PopupService, 
    private router: Router
    ) { }

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

  openTaskPage()
  {
    this.adminService.setCurrentTask(this.task);
    this.router.navigate(['admin/task', this.task._id])
  }

  archiveTask() {
    const task = {...this.task};
    task.isArchived = !this.task.isArchived;
    this.adminService.updateTask(task);
  }
}
