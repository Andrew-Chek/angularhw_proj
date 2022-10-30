import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription} from 'rxjs';
import { Board } from 'src/app/Board';
import { Task } from 'src/app/Task';
import { Message } from 'src/app/Message';
import { AdminService } from './admin.service';
import { PopupService } from 'src/app/shared/popup.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  
  public message$:Observable<Message> = this.adminService.message$;
  public openMessage: boolean = false;

  public board:Board | undefined = {_id:'', name: '', description: '', created_date: ''};
  public task:Task = {_id:'', name: '', description: '', status: '', board_id: '', assigned_to: '', created_date: ''};

  public openDelete: boolean = false;

  public openCreateBoard: boolean = false;
  public openEditBoard:boolean = false;
  public openDeleteBoard:boolean = false;

  public openCreateTask:boolean = false;
  public openEditTask:boolean = false;
  public openDeleteTask:Boolean = false;
  public adminStateSubscription: Subscription = new Subscription();
  public popupSubscription: Subscription = new Subscription();

  constructor(private adminService: AdminService, private popupService: PopupService) {
    this.popupService.setDefault();
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
  }

  deleteTask()
  {
    this.adminService.deleteTask(this.task);
    this.popupService.openDeleteTaskForm()
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
