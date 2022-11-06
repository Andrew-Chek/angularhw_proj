import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription} from 'rxjs';
import { Board } from 'src/app/Board';
import { Task } from 'src/app/Task';
import { AdminService } from './admin.service';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  
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
  private adminStateSubscription: Subscription = new Subscription();
  private popupSubscription: Subscription = new Subscription();

  constructor(private adminService: AdminService, private popupService: PopupService) {
    this.popupService.setDefault();
    const token = window.localStorage.getItem('jwt_token')!
    const value = jwt_decode<{_id: string, email: string, created_date: string}>(token)
    this.username = value.email;
   }

  ngOnInit(): void {
    this.adminStateSubscription = this.adminService.state$.subscribe((value) => {
      this.board = value.board;
      this.task = value.task
    });

    this.popupSubscription = this.popupService.state$.subscribe((value) => {
      this.openCreateBoard = value.openCreateBoard;
      this.openEditBoard = value.openEditBoard;
      this.openDeleteBoard = value.openDeleteBoard;

      this.openCreateTask = value.openCreateTask;
      this.openEditTask = value.openEditTask;
      this.openDeleteTask = value.openDeleteTask;

      this.openDelete = value.openDelete;
    });
  }

  ngOnDestroy()
  {
    this.adminService.displayMessageSubject.unsubscribe();
    this.adminStateSubscription.unsubscribe();
    this.popupSubscription.unsubscribe();
  }

  sendCreateBoardRequest(board:Board)
  {
    this.adminService.createBoard(board);
    this.popupService.openCreateBoardForm();
  }

  sendEditBoardRequest(board:Board)
  {
    this.adminService.updateBoard(board);
    this.popupService.openEditBoardForm()
  }

  sendCreateTaskRequest(task:Task)
  {
    this.adminService.createTask(task);
    this.popupService.openCreateTaskForm();
  }

  sendEditTaskRequest(task:Task)
  {
    this.adminService.updateTask(task);
    this.popupService.openEditTaskForm();
  }

  deleteBoard()
  {
    this.adminService.deleteBoard(this.board);
    this.popupService.openDeleteBoardForm()
    this.adminService.setCurrentBoard({_id:'', name: '', description: '', created_date: ''})
  }

  deleteTask()
  {
    this.adminService.deleteTask(this.task);
    this.popupService.openDeleteTaskForm()
    this.adminService.setCurrentTask({_id:'', name: '', description: '', status: '', board_id: '', assigned_to: '', isArchived: false, comments: [], created_date: ''});
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
