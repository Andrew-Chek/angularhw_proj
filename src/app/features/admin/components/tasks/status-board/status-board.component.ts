import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { mergeMap, of, Observable, map, Subscription, take, firstValueFrom } from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/popup.service';
import { Task } from 'src/app/Task';
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.scss']
})
export class StatusBoardComponent implements OnInit, OnDestroy {

  public tasks$: Observable<Task[]> = this.adminService.tasks$;
  public board: Board = {_id:'', name: '', description: '', created_date: new Date()};
  public status: string = '';
  public adminStateSubscription = new Subscription()

  constructor(private adminService:AdminService, private popupService: PopupService,
    private route:ActivatedRoute) {
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

  @Input()
  set boardValue(board:Board)
  {
    this.board = board;
  }
  get boardValue()
  {
    return this.board;
  }

  async openCreateTaskForm()
  {
    this.popupService.openCreateTaskForm();
  }

  ngOnInit(): void {
    this.adminService.state$.subscribe((value) => {
      console.log(`we are in status-board: '${value.tasks}'`)
      const filteredTasks = value.tasks.filter(task => task.status === this.status)
      this.tasks$ = of(filteredTasks)
    })
  }

  ngOnDestroy()
  {
    this.adminStateSubscription.unsubscribe();
  }
}
