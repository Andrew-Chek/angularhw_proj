import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { PopupState, Store } from '../../interfaces/Store';
import { Task } from '../../interfaces/Task';
import { Comment } from '../../interfaces/Comment';

@Injectable({
  providedIn: 'root'
})
export class PopupService extends Store<PopupState> {

  public openCreateBoard: boolean = false;
  public openEditBoard:boolean = false;
  public openDeleteBoard:boolean = false;

  public openCreateTask:boolean = false;
  public openEditTask:boolean = false;
  public openDeleteTask:Boolean = false;
  public openDelete:boolean = false;
  public isDraged = false;

  public sortParams = 
    new BehaviorSubject<{sortFlag: boolean, propertyName: keyof Board | keyof Task | keyof Comment, sortOrder: 'asc' | 'desc'}>
        ({sortFlag: false, propertyName: 'name', sortOrder: 'asc'})
  public statusColors = new BehaviorSubject({color1: '#ffffff', color2: '#ffffff', color3: '#ffffff'});

  constructor(private router: Router){
    super({openCreateBoard: false, openCreateTask: false, openEditBoard: false, 
    openDeleteTask: false, openDeleteBoard: false, openEditTask: false, openDelete: false, isDraged: false})
  }

  setDefault()
  {
    this.setState({openCreateBoard: false, openCreateTask: false, openEditBoard: false, 
      openDeleteTask: false, openDeleteBoard: false, openEditTask: false, openDelete: false, isDraged: false});
  }

  setColor(color: string, order: number)
  {
    const value = this.statusColors.getValue();
    if(order == 0)
    {
      value.color1 = color;
    }
    else if(order == 1)
    {
      value.color2 = color;
    }
    else if(order == 2)
    {
      value.color3 = color;
    }
    this.statusColors.next(value);
  }

  openCreateBoardForm() {
    this.setState({
      ...this.state,
      openCreateBoard: !this.openCreateBoard
    });
    this.openCreateBoard = !this.openCreateBoard;
  }

  openEditBoardForm() {
    this.setState({
      ...this.state,
      openEditBoard: !this.openEditBoard
    });
    this.openEditBoard = !this.openEditBoard;
  }

  openDeleteBoardForm() {
    this.setState({
      ...this.state,
      openDeleteBoard: !this.openDeleteBoard,
      openDelete: !this.openDelete
    });
    this.openDeleteBoard = !this.openDeleteBoard;
    this.openDelete = !this.openDelete;
  }

  openCreateTaskForm() {
    this.setState({
      ...this.state,
      openCreateTask: !this.openCreateTask
    });
    this.openCreateTask = !this.openCreateTask;
  }

  openEditTaskForm() {
    this.setState({
      ...this.state,
      openEditTask: !this.openEditTask
    });
    this.openEditTask = !this.openEditTask;
  }

  openDeleteTaskForm() {
    this.setState({
      ...this.state,
      openDeleteTask: !this.openDeleteTask,
      openDelete: !this.openDelete
    });
    this.openDeleteTask = !this.openDeleteTask;
    this.openDelete = !this.openDelete;
  }
  
  closeDeleteForm()
  {
    this.openDelete = false;
    this.openDeleteBoard = false;
    this.openDeleteTask = false;
    this.setState({
      ...this.state,
      openDelete: this.openDelete,
      openDeleteBoard: this.openDeleteBoard,
      openDeleteTask: this.openDeleteTask
    })
  }

  setDragState()
  {
    this.setState({
      ...this.state,
      isDraged: !this.isDraged
    });
    this.isDraged = !this.isDraged;
  }
}
