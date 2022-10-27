import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Board } from 'src/app/Board';
import { Message } from 'src/app/Message';
import { BoardObject, BoardsObject } from '../../admin.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private apiUrl:string = 'http://localhost:8080/api';
  constructor(private http:HttpClient) { }

  getBoards() {
    return this.http.get<BoardsObject>(
      `${this.apiUrl}/boards`,
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`},
      }).pipe(
        mergeMap((boardsObj) => {
          return of(boardsObj.boards)
        })
      )
  }

  getBoard(id: string) {
    return this.http.get<BoardObject>(
      `${this.apiUrl}/boards/${id}`,
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`},
      }).pipe(
        mergeMap((boardObj) => {
          return of(boardObj.board)
      }))
  }

  createBoard(board:Board)
  {
    return this.http.post<Message>(`${this.apiUrl}/boards`, 
    {name: board.name, description: board.description}, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`}
    })
  }

  updateBoard(board:Board)
  {
    return this.http.put<Message>(`${this.apiUrl}/boards/${board._id}`, 
    {name: board.name, desciption: board.description}, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`}
    })
  }

  deleteBoard(board:Board | undefined)
  {
    return this.http.delete<Message>(`${this.apiUrl}/boards/${board?._id}`, {
      headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`}
    })
  }
}
