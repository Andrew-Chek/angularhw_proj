import { Injectable } from '@angular/core';
import { Observable, map,  mergeMap } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { BoardsState } from 'src/app/shared/interfaces/boardsState';
import { Store } from 'src/app/shared/interfaces/Store';
import { BoardsService } from '../../components/boards/boards.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsStateService extends Store<BoardsState> {

  constructor(public boardApi: BoardsService) {
    super({
      boards: [],
      board: {_id: '', name: '', description: '', created_date: ''},
    })
  }

  public readonly boards$: Observable<Board[]> = this.state$.pipe(map(x => {return x.boards}));
  public readonly board$: Observable<Board | undefined> = this.state$.pipe(map(x => {return x.board}));
  ngOnInit()
  {

  }

  getBoards() {
    this.boardApi.getBoards().subscribe((value => {
      this.setState({
        ...this.state,
        boards: value
      });
    }))
    return this.boards$;
  }

  getBoard(id: string) {
    this.boardApi.getBoard(id).subscribe((value => {
      this.setState({
        ...this.state,
        board: value
      });
    }))
    return this.board$;
  }

  createBoard(board:Board)
  {
    this.boardApi.createBoard(board)
    .pipe(
      mergeMap(message => {
      return this.boardApi.getBoards()
    })).subscribe(value => {
      this.setState({
        ...this.state,
        boards: value
      });
    })
  }

  updateBoard(board:Board)
  {
    this.boardApi.updateBoard(board)
    .pipe(mergeMap(message => {
      return this.boardApi.getBoards()
    })).subscribe(value => {
      this.setState({
        ...this.state,
        boards: value
      });
    })
  }

  deleteBoard(board:Board | undefined)
  {
    this.boardApi.deleteBoard(board)
    .pipe(mergeMap(message => {
      return this.boardApi.getBoards()
    })).subscribe(value => {
      this.setState({
        ...this.state,
        boards: value
      });
    })
  }
  setCurrentBoard(board: Board)
  {
    this.setState({
      ...this.state,
      board: board
    });
  }
}
