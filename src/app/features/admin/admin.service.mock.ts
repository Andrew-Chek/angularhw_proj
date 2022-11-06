import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Board } from 'src/app/Board';
import { Message } from 'src/app/Message';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { DashboardState } from 'src/app/Store';

@Injectable()
export class AdminServiceMock {

  constructor(){

  }

  public state$ : Observable<DashboardState> = of({tasks: [], boards: [], board: boards[0], task: tasks[0]})
  ngOnInit()
  {
  }

  openMessageBlock(message: Observable<Message>)
  {
  }

  getBoards() {
    return of(boards);
  }

  getBoard(id: string) {
    return of(boards.find(board => board._id == id));
  }

  createBoard(board:Board)
  {
  }

  updateBoard(board:Board)
  {
  }

  deleteBoard(board:Board | undefined)
  {
  }

  getTasks(board_id:string) {
  }

  getTask(id: string)
  {
    return of(tasks.find(task => task._id == id))
  }

  getTaskValue(id: string)
  {
    return of(tasks.find(task => task._id == id))
  }

  createTask(task:Task)
  {
  }

  updateTask(task:Task)
  {
  }

  deleteTask(task: Task)
  {
  }

  setCurrentTask(task: Task)
  {
  }

  setCurrentBoard(board: Board)
  {
  }
}