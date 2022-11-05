import { Component, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { AdminService } from '../../../admin.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit {

  public task!: Task;
  adminSubscription = new Subscription();

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.state$.subscribe(value => {
      this.task = value.task
    })
  }
}
