import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { PopupState } from 'src/app/Store';
import { Task } from 'src/app/Task';

@Injectable()
export class PopupServiceMock {

  public sortParams = new BehaviorSubject<{sortFlag: boolean, propertyName: keyof Task, sortOrder: 'asc' | 'desc'}>({sortFlag: false, propertyName: 'name', sortOrder: 'asc'})
  public statusColors = new BehaviorSubject({color1: '#ffffff', color2: '#ffffff', color3: '#ffffff'});
  public state$: Observable<PopupState> = of({openCreateBoard: false, openCreateTask: false, openEditBoard: false, 
    openDeleteTask: false, openDeleteBoard: false, openEditTask: false, openDelete: false, isDraged: false})

  constructor(){}

  setDefault()
  {
  }

  setColor(color: string, order: number)
  {
  }

  openCreateBoardForm() {
  }

  openEditBoardForm() {
  }

  openDeleteBoardForm() {
  }

  openCreateTaskForm() {
  }

  openEditTaskForm() {
  }

  openDeleteTaskForm() {
  }
  
  closeDeleteForm()
  {
  }

  setDragState()
  {
  }
}
