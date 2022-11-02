import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { AdminService } from 'src/app/features/admin/admin.service';
import { Task } from 'src/app/Task';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input() submitText = '';

  @Output() sentData = new EventEmitter<Task>;

  public statuses:string[] = ['To do', 'In progress', 'Done']
  public readonlyFlag = false;
  public visible = false;
  public task:Task = {_id: '', name: '', description: '', status: 'To do', board_id: '', assigned_to: '', isArchived: false, created_date: ''};
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

  get name() { return this.taskForm.get('name'); }

  get description() { return this.taskForm.get('description'); }

  get status() { return this.taskForm.get('status'); }
  
  constructor(private popupService: PopupService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.state$.subscribe(value => {
      this.taskForm.controls['name'].setErrors(null);
      this.taskForm.controls['description'].setErrors(null);
      this.taskForm.controls['status'].setErrors(null);
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
      if(this.name.errors || this.description.errors || this.status.errors ||
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
      }
      adminSubscription.unsubscribe();
    }
  }
}
