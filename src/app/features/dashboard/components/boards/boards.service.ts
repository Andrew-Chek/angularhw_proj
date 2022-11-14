import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { Message } from 'src/app/shared/interfaces/Message';
import { BoardObject, BoardsObject } from 'src/app/shared/interfaces/apiInterfaces';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private apiUrl:string = 'https://n-npb6.onrender.com/api';
  constructor(private http:HttpClient) { }

  getBoards() {
    return this.http.get<BoardsObject>(
      `${this.apiUrl}/boards`).pipe(
        mergeMap((boardsObj) => {
          return of(boardsObj.boards)
        })
      )
  }

  getBoard(id: string) {
    return this.http.get<BoardObject>(
      `${this.apiUrl}/boards/${id}`).pipe(
        mergeMap((boardObj) => {
          return of(boardObj.board)
      }))
  }

  createBoard(board:Board)
  {
    return this.http.post<Message>(`${this.apiUrl}/boards`, 
    {name: board.name, description: board.description})
  }

  updateBoard(board:Board)
  {
    return this.http.put<Message>(`${this.apiUrl}/boards/${board._id}`, 
    {name: board.name, desciption: board.description})
  }

  deleteBoard(board:Board | undefined)
  {
    return this.http.delete<Message>(`${this.apiUrl}/boards/${board?._id}`)
  }
}
