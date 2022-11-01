import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PopupState, Store } from '../../../Store';
import { Task } from '../../../Task';

@Injectable({
  providedIn: 'root'
})
export class PopupService extends Store<PopupState> {

  private openCreateBoard: boolean = false;
  private openEditBoard:boolean = false;
  private openDeleteBoard:boolean = false;

  private openCreateTask:boolean = false;
  private openEditTask:boolean = false;
  private openDeleteTask:Boolean = false;
  private openDelete:boolean = false;
  private isDraged = false;

  public sortParams = new BehaviorSubject<{sortFlag: boolean, propertyName: keyof Task, sortOrder: 'asc' | 'desc'}>({sortFlag: false, propertyName: 'name', sortOrder: 'asc'})
  public statusColors = new BehaviorSubject({color1: '#ffffff', color2: '#ffffff', color3: '#ffffff'});

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
    else
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
  
  openDeleteForm()
  {
    if(this.openDeleteBoard)
    {
      this.openDeleteBoardForm()
    }
    else if(this.openDeleteTask)
    {
      this.openDeleteTaskForm();
    }
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