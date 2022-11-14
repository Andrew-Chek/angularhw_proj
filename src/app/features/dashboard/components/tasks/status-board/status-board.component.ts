import { Component, ElementRef, Input, OnDestroy, Output, EventEmitter, OnInit, QueryList, ViewChild, ViewChildren, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, map, Subscription } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { Task } from 'src/app/shared/interfaces/Task';
import { SortByPipe } from '../../../pipes/sort-by.pipe';
import { TasksStateService } from '../../../services/tasks-state/tasks-state.service';

@Component({
  selector: 'app-status-board',
  templateUrl: './status-board.component.html',
  styleUrls: ['./status-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SortByPipe]
})
export class StatusBoardComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChildren('taskItem') taskItems!: QueryList<ElementRef> 
  @ViewChild('boardMain') boardMain!: ElementRef<StatusBoardComponent>;
  @ViewChild('color') colorInput!: ElementRef<HTMLInputElement>;
  
  @Output() sentTaskItems: EventEmitter<QueryList<ElementRef>> = new EventEmitter();

  @Input() board:Board = {_id: '', name:'', description: '', created_date: ''};
  @Input() status: {value: string, color: string} = {value: 'To do', color: '#ffffff'}
  @Input()
  set tasksValue$(tasks$:Observable<Task[]>)
  {
    this.tasks$ = tasks$.pipe(
      map(tasks => {
      return tasks.filter(task => task.status === this.status.value)
    }));
  }

  public isDraged = false;
  public tasks$: Observable<Task[]> = this.tasksStateService.tasks$
  .pipe(
    map(tasks => {
    return tasks.filter(task => task.status === this.status.value)
  }));

  private subscriptions: Subscription[] = [];

  constructor(
    private tasksStateService:TasksStateService, 
    private popupService: PopupService,
    private sortByPipe: SortByPipe) {
  }

  ngOnInit(): void {
    const sortSubscription = this.popupService.sortParams.subscribe(value => {
      if(value.sortFlag == true)
      {
        this.tasks$ = this.tasks$.pipe(
          map(tasks => {
            const sortedTasks = this.sortByPipe.transform(tasks, value.sortOrder, value.propertyName as keyof Task)
            return sortedTasks != null ? sortedTasks : tasks;
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

  ngAfterViewInit(): void {
    this.colorInput.nativeElement.value = this.status.color;
  }

  setColor(color: string)
  {
    const order = this.status.value == 'To do' ? 0 : this.status.value == 'In progress' ? 1 : 2;
    this.popupService.setColor(color, order)
  }

  openCreateTaskForm()
  {
    this.tasksStateService.setCurrentTask({
      _id: '', 
      name: '', 
      description: '', 
      status: this.status.value, 
      assigned_to: '', 
      board_id: '', 
      comments: [], 
      isArchived: false, 
      created_date: ''
    })
    this.popupService.openCreateTaskForm();
  }
}
