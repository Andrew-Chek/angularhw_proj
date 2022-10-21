import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { map, mergeMap, Observable, of, take } from 'rxjs';
import { Message } from 'src/app/Message';
import { Board } from '../../../../../Board'
import { AdminService } from '../../../admin.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  public board:Board = {_id: '', name:'', description: '', created_date: new Date()};
  public message$:Observable<Message> = new Observable();
  public date:string = this.board.created_date.toLocaleDateString();
  public isPressed:boolean = false;
  constructor(private adminService: AdminService) { }

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

  ngOnDestroy()
  {
    this.adminService.createFormSubject.unsubscribe();
    this.adminService.displayMessageSubject.unsubscribe();
  }

  openEditForm()
  {
    this.adminService.currentBoardSubject.next(this.board);
    this.adminService.openEditBoardForm();
  }

  openDeleteForm()
  {
    this.adminService.currentBoardSubject.next(this.board);
    this.adminService.openDeleteBoardForm();
  }
}
