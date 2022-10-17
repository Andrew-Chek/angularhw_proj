import { Component, OnInit } from '@angular/core';
import { IconListComponent } from '../icon-list/icon-list.component';

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
  public tRight:boolean = true;
  public tDown:boolean = false;
  public bLabel:boolean = false;
  public tLabel:boolean = false;
  constructor() { }

  ngOnInit(): void {
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

}
