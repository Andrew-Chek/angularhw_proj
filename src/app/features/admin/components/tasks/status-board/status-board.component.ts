import { Component, ElementRef, Input, OnDestroy, Output, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren, AfterViewInit} from '@angular/core';
import { Observable, map, Subscription } from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
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

  ngOnInit(): void {
    const sortSubscription = this.popupService.sortParams.subscribe(value => {
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
    const colorSubscription = this.popupService.statusColors.subscribe(value => {
      if(this.status.value == 'To do')
      {
        this.status.color = value.color1
      }
      else if(this.status.value == 'In progress')
      {
        this.status.color = value.color2;
      }
      else {
        this.status.color = value.color3;
      }
    })
    const popupStateSubscription = this.popupService.state$.subscribe(value => {
      this.isDraged = value.isDraged;
    })
    this.subscriptions.push(sortSubscription, colorSubscription, popupStateSubscription)
  }

  ngOnDestroy()
  {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  public board: Board = {_id:'', name: '', description: '', created_date: ''};
  public status!: {value: string, color: string};
  public isDraged = false;
  private subscriptions: Subscription[] = [];
  public tasks$: Observable<Task[]> = this.adminService.tasks$
  .pipe(
    map(tasks => {
    return tasks.filter(task => task.status === this.status.value)
  }));

  @ViewChildren('taskItem') taskItems!: QueryList<ElementRef> 
  @ViewChild('boardMain') boardMain!: ElementRef<StatusBoardComponent>;
  @Output() sentTaskItems: EventEmitter<QueryList<ElementRef>> = new EventEmitter();

  constructor(private adminService:AdminService, private popupService: PopupService,
    private sortByPipe: SortByPipe) {
  }

  @Input()
  set statusValue(status:{value: string, color: string})
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
      return tasks.filter(task => task.status === this.status.value)
    }));
  }
  get tasksValue$()
  {
    return this.tasks$;
  }

  setColor(color: string)
  {
    const order = this.status.value == 'To do' ? 0 : this.status.value == 'In progress' ? 1 : 2;
    this.popupService.setColor(color, order)
  }

  openCreateTaskForm()
  {
    this.adminService.setCurrentTask({_id: '', name: '', description: '', status: this.status.value, assigned_to: '', board_id: '', isArchived: false, created_date: ''})
    this.popupService.openCreateTaskForm();
  }
}
