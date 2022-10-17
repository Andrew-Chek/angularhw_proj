import { Injectable } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Board } from 'src/app/Board';

@Injectable()
export class AdminService {

  constructor() { }
  public boards: Board[] = [
    {id:0, name: 'Board1', description: '123456', creation_date: '19/12/2020'}, 
    {id:1, name: 'Board2', description: 'asdfgh', creation_date: '15/12/2015'},
    {id:2, name: 'Board3', description: 'zxcvbn', creation_date: '11/08/2017'},
    {id:3, name: 'Board4', description: '123qwe', creation_date: '15/04/2003'},
    {id:4, name: 'Board5', description: 'asdqwe', creation_date: '06/03/2019'}];

  getBoards(): Observable<Board[]> {
    // TODO: send the message _after_ fetching the heroes
    return of(this.boards);
  }

  getBoard(id: number | string) {
    return this.getBoards().pipe(
      // (+) before `id` turns the string into a number
      map((boards: Board[]) => boards.find(board => board.id === +id)!)
    );
  }
}
