import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, map, mergeMap, Observable, of, Subscription, take } from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/popup.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.scss']
})
export class BoardMenuComponent implements OnInit, OnDestroy {

  public openTasks:boolean = false;
  public openBoards:boolean = false;

  public bList:boolean = false;
  public tList:boolean = false;

  public boardCount:number = 0;
  public taskCount:number = 0;
  public board_id:string = '';

  public boards$:Observable<Board[]>;
  public adminStateSubscription = new Subscription();
  constructor(private adminService:AdminService, private popupService:PopupService, private router: Router) {
    this.boards$ = this.adminService.getBoards();
  }
  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.boards$ = this.adminService.getBoards();
    this.adminStateSubscription = this.adminService.state$.subscribe((value) => {
      console.log(`we are in board menu: '${value.tasks}'`)
      this.boards$ = of(value.boards);
      this.boardCount = value.boards.length;
      // this.board_id = value.boards[0]._id;
    })
  }

  openTaskList()
  {
    this.tList = !this.tList;
    this.openTasks = !this.openTasks;
  }

  setTasks(board:Board)
  {
    this.adminService.getTasks(board._id).pipe(
      concatMap(value => {
        return this.adminService.getBoard(board._id)
      }),
      concatMap((value) => {
        return of("Succesfully set")
    }), take(1)).subscribe(value => {
      console.log(value)
      this.router.navigate(['admin/board', board._id])
    })
  }

  openBoardList()
  {
    this.bList = !this.bList;
    this.openBoards = !this.openBoards;
  }

  openCreateForm()
  {
    this.popupService.openCreateBoardForm();
  }

  getTasksCount(status:string)
  {
    let count:number = 0;
    return count;
  }
}
