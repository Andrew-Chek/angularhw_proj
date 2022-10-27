import { Injectable } from '@angular/core';
import { PopupState, Store } from '../Store';

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

  setDefault()
  {
    this.setState({openCreateBoard: false, openCreateTask: false, openEditBoard: false, 
      openDeleteTask: false, openDeleteBoard: false, openEditTask: false, openDelete: false});
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
}