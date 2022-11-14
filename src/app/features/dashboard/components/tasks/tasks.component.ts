import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, QueryList, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { mergeMap, Observable, of, Subscription, tap} from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { Task } from 'src/app/shared/interfaces/Task';
import { ActivatedRoute } from '@angular/router';
import { BoardsStateService } from '../../services/boards-state/boards-state.service';
import { TasksStateService } from '../../services/tasks-state/tasks-state.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {

  @ViewChildren('statusBoard') statusBoards!: QueryList<ElementRef>

  public board: Board = {_id:'', name: '', description: '', created_date: ''};
  public tasks$: Observable<Task[]> = new Observable();
  public statuses = [{value: 'To do', color: '#ffffff'}, {value: 'In progress', color: '#ffffff'}, {value: 'Done', color: '#ffffff'}];

  private subscriptions: Subscription[] = [];

  constructor(
    private boardsStateService: BoardsStateService, 
    private tasksStateService: TasksStateService,
    private popupService: PopupService,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const routeSubsription = this.activeRoute.data.pipe(
      tap(value => {
      this.boardsStateService.setCurrentBoard(value['board']);
      this.tasksStateService.setCurrentTasks(value['tasks']);
    })).subscribe()

    const boardSubsription = this.boardsStateService.state$.subscribe(value => {
      this.board = value.board!;
    })
    const taskSubscription = this.tasksStateService.state$.subscribe(value => {
      this.tasks$ = of(value.tasks);
    })

    this.subscriptions.push(routeSubsription);
    this.subscriptions.push(boardSubsription);
    this.subscriptions.push(taskSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  openCreateTaskForm(openInfo: boolean)
  {
    if(openInfo)
    {
      this.tasksStateService.setCurrentTask({_id: '', name: '', description: '', status: 'To do', assigned_to: '', board_id: '', isArchived: false, comments: [], created_date: ''})
      this.popupService.openCreateTaskForm()
    }
  }

  filterTasks(value: string)
  {
    if(value == '')
    {
      this.tasks$ = this.tasksStateService.tasks$;
    }
    else
    {
      this.tasks$ = this.tasks$.pipe(
        mergeMap(tasks => {
          const filteredArray = tasks.filter(function(task) {
            return task.name.includes(value)
          });
          return of(filteredArray);
      }))
    }
  }
}
