import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { Task } from 'src/app/shared/interfaces/Task';
import { TasksStateService } from '../../../services/tasks-state/tasks-state.service';
import { BoardsStateService } from '../../../services/boards-state/boards-state.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input() task :Task = {_id: '', name: '', description: '', board_id: '', assigned_to: '', comments: [], status: '', isArchived: false, created_date:''};
  public isPressed = false;

  constructor(
    private tasksStateService: TasksStateService, 
    private boardsStateService: BoardsStateService,
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
    this.boardsStateService.getBoard(this.task.board_id).subscribe();
    this.tasksStateService.setCurrentTask({...this.task});
    this.popupService.openEditTaskForm();
  }

  openDeleteTaskForm()
  {
    this.boardsStateService.getBoard(this.task.board_id).subscribe();
    this.tasksStateService.setCurrentTask({...this.task});
    this.popupService.openDeleteTaskForm();
  }

  openTaskPage()
  {
    this.tasksStateService.setCurrentTask(this.task);
    this.router.navigate(['dashboard/task', this.task._id])
  }

  archiveTask() {
    const task = {...this.task};
    task.isArchived = !this.task.isArchived;
    this.tasksStateService.updateTask(task);
  }
}
