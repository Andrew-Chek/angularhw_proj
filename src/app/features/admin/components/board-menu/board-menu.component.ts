import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { Board } from 'src/app/Board';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.scss']
})
export class BoardMenuComponent implements OnInit {

  public openTasks:boolean = false;
  public openBoards:boolean = false;

  public bRight:boolean = true;
  public bDown:boolean = false;
  public bLabel:boolean = false;

  public tRight:boolean = true;
  public tDown:boolean = false;
  public tLabel:boolean = false;

  public boardCount:number = 0;

  public boards$:Observable<Board[]>;
  constructor(private adminService:AdminService) {
    this.boards$ = this.adminService.boards$;
  }

  ngOnInit(): void {
    this.adminService.displayBoardsSubject.subscribe((boards$) => {
      this.boards$ = boards$;
      boards$.subscribe((boards) => this.boardCount = boards.length)
    })
  }

  openTaskList()
  {
    this.tLabel = !this.tLabel;
    this.openTasks = !this.openTasks;
    this.tRight = !this.tRight;
    this.tDown = !this.tDown;
  }

  openBoardList()
  {
    this.bLabel = !this.bLabel;
    this.openBoards = !this.openBoards;
    this.bRight = !this.bRight;
    this.bDown = !this.bDown;
  }

  openCreateForm()
  {
    this.adminService.openCreateBoardForm();
  }
}
