import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable, of } from 'rxjs';
import { Task } from 'src/app/Task';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor(private adminService:AdminService) {

  }
  public statuses = ['To do', 'In progress', 'Done']
  ngOnInit(): void {
    
  }

  openCreateTaskForm()
  {
    //TODO
  }
}
