import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, Observable, of, Subscription } from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.scss']
})
export class BoardMenuComponent implements OnInit, OnDestroy {

  public openTasks = false;
  public openBoards = false;

  public bList = false;
  public tList = false;

  public boardCount = 0;
  public taskCount = 0;
  public board_id = '';

  public boards$:Observable<Board[]> = this.adminService.getBoards();
  private adminStateSubscription = new Subscription();
  
  constructor(private adminService:AdminService, private popupService:PopupService, private router: Router) {
  }

  ngOnInit(): void {
    this.adminStateSubscription = this.adminService.state$.subscribe((value) => {
      this.boards$ = of(value.boards);
      this.boardCount = value.boards.length;
      // this.board_id = value.boards[0]._id;
    })
  }

  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe();
  }

  openTaskList()
  {
    this.tList = !this.tList;
    this.openTasks = !this.openTasks;
  }

  setTasks(board:Board)
  {
    this.router.navigate(['admin/board', board._id])
  }

  openBoardList()
  {
    this.bList = !this.bList;
    this.openBoards = !this.openBoards;
  }

  getTasksCount(status:string)
  {
    let count:number = 0;
    return count;
  }
}
