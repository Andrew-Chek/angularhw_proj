import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/Board';

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

  public boards:Board[] = [
    {id:0, name: 'Board1', description: '123456', creation_date: '19/12/2020'}, 
    {id:1, name: 'Board2', description: 'asdfgh', creation_date: '15/12/2015'},
    {id:2, name: 'Board3', description: 'zxcvbn', creation_date: '11/08/2017'},
    {id:3, name: 'Board4', description: '123qwe', creation_date: '15/04/2003'},
    {id:4, name: 'Board5', description: 'asdqwe', creation_date: '06/03/2019'}];
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
