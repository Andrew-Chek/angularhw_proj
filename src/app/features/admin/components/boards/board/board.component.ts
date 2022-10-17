import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../../../../../Board'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  public board:Board = new Board(0, '', '', '');
  public isPressed:boolean = false;
  constructor() { }

  @Input()
  set boardValue(board: Board) {
		this.board = board;
	}
	get boardValue(): Board {
    return this.board;
	}

  ngOnInit(): void {

  }

  openMore()
  {
    this.isPressed = !this.isPressed;
  }

}
