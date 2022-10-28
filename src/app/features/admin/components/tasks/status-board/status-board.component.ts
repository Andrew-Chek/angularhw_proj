import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { mergeMap, of, Observable, map, Subscription, take, firstValueFrom } from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/popup.service';
import { Task } from 'src/app/Task';
import { AdminService } from '../../../admin.service';
import { SortByPipe } from '../../../pipes/sort-by.pipe';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.scss'],
  providers: [SortByPipe]
})
export class StatusBoardComponent implements OnInit, OnDestroy {

  public tasks$: Observable<Task[]> = this.adminService.tasks$
  .pipe(
    map(tasks => {
    return tasks.filter(task => task.status === this.status)
  }));
  public board: Board = {_id:'', name: '', description: '', created_date: ''};
  public status: string = '';
  public adminStateSubscription = new Subscription();

  constructor(private adminService:AdminService, private popupService: PopupService,
    private sortByPipe: SortByPipe) {
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

  @Input()
  set tasksValue$(tasks$:Observable<Task[]>)
  {
    this.tasks$ = tasks$.pipe(
      map(tasks => {
      return tasks.filter(task => task.status === this.status)
    }));
  }
  get tasksValue$()
  {
    return this.tasks$;
  }

  async openCreateTaskForm()
  {
    this.adminService.setCurrentTask({_id: '', name: '', description: '', status: this.status, assigned_to: '', board_id: '', created_date: ''})
    this.popupService.openCreateTaskForm();
  }

  ngOnInit(): void {
    this.popupService.sortParams.subscribe(value => {
      if(value.sortFlag == true)
      {
        this.tasks$ = this.tasks$.pipe(
          map(tasks => {
            const filteredTasks = this.sortByPipe.transform(tasks, value.sortOrder, value.propertyName)
            return filteredTasks != null ? filteredTasks : tasks;
          })
        )
      }
    })
  }

  ngOnDestroy()
  {
    this.adminStateSubscription.unsubscribe();
  }
}
