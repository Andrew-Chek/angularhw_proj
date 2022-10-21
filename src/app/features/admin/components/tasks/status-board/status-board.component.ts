import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, of, Observable } from 'rxjs';
import { Task } from 'src/app/Task';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.scss']
})
export class StatusBoardComponent implements OnInit {

  public tasks$:Observable<Task[]>;
  public board_id: string;
  public status: string = '';

  constructor(public adminService:AdminService, 
    private route:ActivatedRoute) {
    this.board_id = '';
    this.route.params.subscribe(params => {
      this.board_id = params['id'];
    })
    this.tasks$ = this.adminService.getTasksByStatus(this.board_id, this.status).pipe(
      mergeMap((tasksObj)=> {
        return of(tasksObj.tasks);
    }));
  }

  @Input()
  set statusValue(status:string)
  {
    this.status = status;
  }
  get statusValue()
  {
    return this.status;
  }


  openCreateTaskForm()
  {
    // this.adminService.openCreateTaskForm();
  }

  ngOnInit(): void {
    this.tasks$ = this.adminService.getTasksByStatus(this.board_id, this.status).pipe(
      mergeMap((tasksObj)=> {
        return of(tasksObj.tasks);
    }));
  }
}
