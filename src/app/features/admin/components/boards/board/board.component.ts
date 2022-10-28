import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { concatMap, map, mergeMap, Observable, of, Subscription, take } from 'rxjs';
import { Message } from 'src/app/Message';
import { PopupService } from 'src/app/shared/popup.service';
import { Board } from '../../../../../Board'
import { Task } from 'src/app/Task';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  public board:Board = {_id: '', name:'', description: '', created_date: ''};
  public tasks:Task[] = [];
  public message$:Observable<Message> = new Observable();
  public isPressed:boolean = false;
  public adminStateSubscription = new Subscription();
  constructor(private adminService: AdminService, private popupService: PopupService, private router: Router) {
  }

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
    this.adminStateSubscription.unsubscribe();
    this.adminService.displayMessageSubject.unsubscribe();
  }
  
  setTasks()
  {
    this.adminService.getTasks(this.board._id).pipe(
      concatMap(value => {
        return this.adminService.getBoard(this.board._id)
      }),
      concatMap((value) => {
        return of("Succesfully set")
      })
    ).subscribe(value => {
      console.log(value)
      this.router.navigate(['admin/board', this.board._id])
    })
  }

  openEditForm()
  {
    this.adminService.setCurrentBoard({...this.board});
    this.popupService.openEditBoardForm();
  }

  openDeleteForm()
  {
    this.adminService.setCurrentBoard({...this.board});
    this.popupService.openDeleteBoardForm();
  }
}
