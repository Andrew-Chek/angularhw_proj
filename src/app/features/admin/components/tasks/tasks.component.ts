import { Component, OnInit, OnDestroy, ViewChildren, ElementRef, QueryList, AfterViewInit } from '@angular/core';
import { mergeMap, Observable, of, Subscription} from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/popup.service';
import { AdminService } from '../../admin.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy, AfterViewInit {

  public board: Board = {_id:'', name: '', description: '', created_date: ''};
  public tasks$: Observable<Task[]> = new Observable();
  public adminStateSubscription = new Subscription();
  public statuses = [{value: 'To do', color: '#ffffff'}, {value: 'In progress', color: '#ffffff'}, {value: 'Done', color: '#ffffff'}];
  public propertyName: keyof Task = 'name';
  public sortFlag = false;
  public ascOrder: 'asc' | 'desc' = 'asc';
  @ViewChildren('statusBoard') statusBoards!: QueryList<ElementRef>

  constructor(private adminService: AdminService,
    private popupService: PopupService) {
  }

  ngOnInit(): void {
    this.adminStateSubscription = this.adminService.state$.subscribe((value) => {
      console.log(`we are in tasks: '${value.tasks}'`)
      if(value.board != undefined)
      {
        this.board = value.board;
        this.tasks$ = of(value.tasks)
      }
    })
  }

  ngAfterViewInit()
  {
    // this.dragDropService.addDragAndDropEvents();
  }

  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe();
  }

  openCreateTaskForm()
  {
    this.popupService.openCreateTaskForm();
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
