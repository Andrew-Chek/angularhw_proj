import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, QueryList, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { mergeMap, Observable, of, Subscription} from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { AdminService } from '../../admin.service';
import { Task } from 'src/app/Task';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

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

  private adminStateSubscription = new Subscription();

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.adminStateSubscription = this.adminService.state$.subscribe((value) => {
      if(value.board != undefined)
      {
        this.board = value.board;
        this.tasks$ = of(value.tasks)
      }
    })
  }

  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe();
  }

  filterTasks(value: string)
  {
    if(value == '')
    {
      this.tasks$ = this.adminService.tasks$;
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
