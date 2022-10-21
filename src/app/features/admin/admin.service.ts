import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map, BehaviorSubject, mergeMap, of, take } from 'rxjs';
import { Board } from 'src/app/Board';
import { Message } from 'src/app/Message';
import { Task } from 'src/app/Task';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit {

  constructor(private http:HttpClient) { }

  private apiUrl:string = 'http://localhost:8080/api';
  public boards$:Observable<Board[]> = this.getBoards().pipe(
    mergeMap((boardsObj) => {return of(boardsObj.boards)})
  );
  public currentBoardSubject = new BehaviorSubject<Board>({_id:'', name: '', description: '', created_date: new Date()});
  public message$:Observable<Message> = of({isDisplayed: false, message: ''})

  createFormSubject = new BehaviorSubject<boolean>(false);
  editFormSubject = new BehaviorSubject<boolean>(false);
  deleteFormSubject = new BehaviorSubject<boolean>(false);
  displayMessageSubject = new BehaviorSubject<Observable<Message>>(this.message$);
  displayBoardsSubject = new BehaviorSubject<Observable<Board[]>>(this.boards$)

  ngOnInit()
  {

  }

  openCreateBoardForm() {
    this.createFormSubject.next(!this.createFormSubject.value);
  }

  openEditBoardForm() {
    this.editFormSubject.next(!this.editFormSubject.value);
  }

  openDeleteBoardForm() {
    this.deleteFormSubject.next(!this.deleteFormSubject.value);
  }

  openMessageBlock(message: Observable<Message>)
  {
    this.displayMessageSubject.next(message);
  }

  getBoards(): Observable<BoardsObject> {
    return this.http.get<BoardsObject>(
      `${this.apiUrl}/boards`,
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`},
      })
  }

  getTasks(board_id:string): Observable<TasksObject> {
    return this.http.get<TasksObject>(
      `${this.apiUrl}/tasks/${board_id}`,
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`},
      })
  }

  getTasksByStatus(board_id:string, status:string): Observable<TasksObject> {
    return this.http.get<TasksObject>(
      `${this.apiUrl}/tasks/${board_id}`,
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`},
        params: {
          status
        }
      })
  }

  getBoard(id: number | string) {
    return this.getBoards().pipe(
      map((boardsObj: BoardsObject) => boardsObj.boards.find(board => board._id === id)!)
    );
  }

  createBoard(board:Board)
  {
    return this.http.post<Message>(`${this.apiUrl}/boards`, 
    {name: board.name, description: board.description}, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`}
    })
  }

  detectBoardsChange()
  {
    this.displayBoardsSubject.next(this.getBoards().pipe(
      mergeMap((boardsObj) => {return of(boardsObj.boards)})
    ));
  }

  updateBoard(board:Board)
  {
    return this.http.put<Message>(`${this.apiUrl}/boards/${board._id}`, 
    {name: board.name, desciption: board.description}, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`}
    })
  }

  deleteBoard(board:Board)
  {
    return this.http.delete<Message>(`${this.apiUrl}/boards/${board._id}`, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`}
    })
  }
}

export class BoardsObject{
  constructor(boards:Board[])
  {
    this.boards = boards;
  }
  public boards:Board[];
}

export class TasksObject{
  constructor(tasks:Task[])
  {
    this.tasks = tasks;
  }
  public tasks:Task[];
}