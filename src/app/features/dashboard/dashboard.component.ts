import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription} from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { Task } from 'src/app/shared/interfaces/Task';
import { BoardsStateService } from './services/boards-state/boards-state.service';
import { TasksStateService } from './services/tasks-state/tasks-state.service';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  protected openMessage: boolean = false;
  protected username: string;

  public board:Board | undefined = {_id:'', name: '', description: '', created_date: ''};
  public task:Task = {_id:'', name: '', description: '', status: '', board_id: '', assigned_to: '', isArchived: false, comments: [], created_date: ''};

  protected openDelete: boolean = false;

  protected openCreateBoard: boolean = false;
  protected openEditBoard:boolean = false;
  protected openDeleteBoard:boolean = false;

  protected openCreateTask:boolean = false;
  protected openEditTask:boolean = false;
  protected openDeleteTask:Boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private boardsStateService: BoardsStateService, 
    private tasksStateService: TasksStateService,
    private popupService: PopupService
    ) {
    this.popupService.setDefault();
    const token = window.localStorage.getItem('jwt_token')!
    const value = jwt_decode<{_id: string, email: string, created_date: string}>(token)
    this.username = value.email;
   }

  ngOnInit(): void {
    const boardSubscription = this.boardsStateService.state$.subscribe((value) => {
      this.board = value.board;
    });

    const taskSubscription = this.tasksStateService.state$.subscribe((value) => {
      this.task = value.task
    })

    const popupSubscription = this.popupService.state$.subscribe((value) => {
      this.openCreateBoard = value.openCreateBoard;
      this.openEditBoard = value.openEditBoard;
      this.openDeleteBoard = value.openDeleteBoard;

      this.openCreateTask = value.openCreateTask;
      this.openEditTask = value.openEditTask;
      this.openDeleteTask = value.openDeleteTask;

      this.openDelete = value.openDelete;
    });

    this.subscriptions.push(boardSubscription);
    this.subscriptions.push(taskSubscription);
    this.subscriptions.push(popupSubscription);
  }

  ngOnDestroy()
  {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }

  sendCreateBoardRequest(board:Board)
  {
    this.boardsStateService.createBoard(board);
    this.popupService.openCreateBoardForm();
  }

  sendEditBoardRequest(board:Board)
  {
    this.boardsStateService.updateBoard(board);
    this.popupService.openEditBoardForm()
  }

  sendCreateTaskRequest(task:Task)
  {
    this.tasksStateService.createTask(task);
    this.popupService.openCreateTaskForm();
  }

  sendEditTaskRequest(task:Task)
  {
    this.tasksStateService.updateTask(task);
    this.popupService.openEditTaskForm();
  }

  deleteBoard()
  {
    this.boardsStateService.deleteBoard(this.board);
    this.popupService.openDeleteBoardForm()
    this.boardsStateService.setCurrentBoard({_id:'', name: '', description: '', created_date: ''})
  }

  deleteTask()
  {
    this.tasksStateService.deleteTask(this.task);
    this.popupService.openDeleteTaskForm()
    this.tasksStateService.setCurrentTask({_id:'', name: '', description: '', status: '', board_id: '', assigned_to: '', isArchived: false, comments: [], created_date: ''});
  }

  deleteItem()
  {
    if(this.openDeleteBoard)
    {
      this.deleteBoard();
    }
    else
    {
      this.deleteTask();
    }
  }
}
