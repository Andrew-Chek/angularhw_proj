import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { firstValueFrom, lastValueFrom, map, take, tap } from 'rxjs';
import { Board } from 'src/app/Board';
import { AdminService } from 'src/app/features/admin/admin.service';
import { TasksService } from 'src/app/features/admin/components/tasks/tasks.service';
import { Task } from 'src/app/Task';
import { PopupService } from '../../popup.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  constructor(private popupService: PopupService, private adminService: AdminService) { }

  public statuses:string[] = ['To do', 'In progress', 'Done']
  public taskForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    status: new FormControl(this.statuses[0])
  })
  public submitText:string = '';
  public readonlyFlag:boolean = false;
  public visible = false;

  @Output() sentData = new EventEmitter<Task>;

  @Input()
  set setSubmit(text:string)
  {
    this.submitText = text;
  }
  get setSubmit()
  {
    return this.submitText;
  }

  public task:Task = {_id: '', name: '', description: '', status: 'To do', board_id: '', assigned_to: '', created_date: new Date()};
  
  @Input()
  set setTask(task:Task)
  {
    this.task = {...task};
  }
  get setTask()
  {
    return this.task;
  }

  get name() { return this.taskForm.get('name'); }

  get description() { return this.taskForm.get('description'); }

  get status() { return this.taskForm.get('status'); }
  

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
  }

  sendForm()
  {
    if(this.name?.value != null && this.description?.value != null 
        && this.status?.value != null)
    {
      this.task.name = this.name.value;
      this.task.description = this.description.value;
      this.task.status = this.status.value;
      const adminSubscription = this.adminService.state$.pipe(
        tap(value => {
          if(value.board != undefined)
          {
            this.task.board_id = value.board._id;
          }
      })).subscribe();
      this.sentData.emit(this.task)
      adminSubscription.unsubscribe();
      this.task.name = '';
      this.task.description = '';
    }
  }

  ngOnInit(): void {
    this.adminService.state$.subscribe(value => {
      this.task = value.task;
    })
    this.readonlyFlag = (this.submitText == 'Edit Task');
    if(this.submitText == 'Edit Task')
    {
      this.popupService.state$.subscribe(value => {
        this.visible = value.openEditTask
      })
    }
    else
    {
      this.popupService.state$.subscribe(value => {
        this.visible = value.openCreateTask
      })
    }
  }
}
