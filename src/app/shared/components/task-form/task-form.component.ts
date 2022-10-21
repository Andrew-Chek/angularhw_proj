import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/Task';
import { AdminService } from 'src/app/features/admin/admin.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  public taskForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  })
  public submitText:string = '';
  public readonlyFlag:boolean = false;

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
    this.task = task;
  }
  get setTask()
  {
    return this.task;
  }

  get name() { return this.taskForm.get('name'); }

  get description() { return this.taskForm.get('description'); }
  

  closePopup()
  {
    if(this.submitText == 'Edit Task')
    {

    }
    else
    {
      this.adminService.openCreateBoardForm();
    }
  }

  sendForm()
  {
    if(this.name?.value != null && this.description?.value != null)
    {
      this.task.name = this.name.value;
      this.task.description = this.description.value;
      this.sentData.emit(this.task)
    }
  }

  ngOnInit(): void {
    if(this.submitText == 'Create Task')
    {
      this.readonlyFlag = false;
    }
    else if(this.submitText == 'Edit Task')
    {
      this.taskForm.get('name')?.setValue(this.task.name);
      this.taskForm.get('description')?.setValue(this.task.description);
      this.readonlyFlag = true;
    }
  }
}
