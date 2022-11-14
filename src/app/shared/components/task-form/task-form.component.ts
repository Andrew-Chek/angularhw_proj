import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, tap } from 'rxjs';
import { BoardsStateService } from 'src/app/features/dashboard/services/boards-state/boards-state.service';
import { TasksStateService } from 'src/app/features/dashboard/services/tasks-state/tasks-state.service';
import { Task } from 'src/app/shared/interfaces/Task';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnDestroy {

  @Input() submitText = '';

  @Output() sentData = new EventEmitter<Task>;

  public statuses:string[] = ['To do', 'In progress', 'Done']
  public readonlyFlag = false;
  public visible = false;
  public task:Task = {_id: '', name: '', description: '', status: 'To do', board_id: '', assigned_to: '', comments: [], isArchived: false, created_date: ''};
  public checkErrors = false;
  public taskForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    status: new FormControl(this.statuses[0], [
      Validators.required,
    ])
  })
  private subscriptions: Subscription[] = []

  get name() { return this.taskForm.get('name'); }

  get description() { return this.taskForm.get('description'); }

  get status() { return this.taskForm.get('status'); }
  
  constructor(
    private popupService: PopupService, 
    private tasksStateService: TasksStateService,
    private boardsStateService: BoardsStateService
    ) { }

  ngOnInit(): void {
    const taskSubscription = this.tasksStateService.state$.subscribe(value => {
      this.taskForm.controls['name'].setErrors(null);
      this.taskForm.controls['description'].setErrors(null);
      this.taskForm.controls['status'].setErrors(null);
      this.task = value.task;
    })
    this.subscriptions.push(taskSubscription)
    this.readonlyFlag = (this.submitText == 'Edit Task');
    if(this.submitText == 'Edit Task')
    {
      const popupSubscription = this.popupService.state$.subscribe(value => {
        this.visible = value.openEditTask
      })
      this.subscriptions.push(popupSubscription)
    }
    else
    {
      const popupSubscription = this.popupService.state$.subscribe(value => {
        this.visible = value.openCreateTask
      })
      this.subscriptions.push(popupSubscription)
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  closePopup()
  {
    if(this.submitText == 'Edit Task')
    {
      this.popupService.openEditTaskForm();
    }
    else
    {
      this.popupService.openCreateTaskForm();
    }
    this.task.name = '';
    this.task.description = '';
    this.task.status = '';
    this.taskForm.controls['name'].setErrors(null);
    this.taskForm.controls['description'].setErrors(null);
    this.taskForm.controls['status'].setErrors(null);
    this.checkErrors = false;
  }

  sendForm()
  {
    this.task.name = this.name!.value!;
    this.task.description = this.description!.value!;
    this.task.status = this.status!.value!;
    const boardSubscription = this.boardsStateService.state$.pipe(
      tap(value => {
        if(value.board != undefined)
        {
          this.task.board_id = value.board._id;
        }
    })).subscribe();
    if(this.name!.errors || this.description!.errors || this.status!.errors ||
      this.task.name == '' || this.task.description == '' || this.task.status == '')
    {
      this.checkErrors = true;
    }
    else
    {
      this.sentData.emit(this.task)
      this.task.name = '';
      this.task.description = '';
      this.checkErrors = false;
      this.tasksStateService.setCurrentTask({_id: '', name: '', description: '', status: 'To do', board_id: '', assigned_to: '', comments: [], isArchived: false, created_date: ''});
    }
    this.subscriptions.push(boardSubscription);
  }
}
