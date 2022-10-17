import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  constructor() { }

  public boards = [
    {id:0, name: 'Board1', description: '123456', creation_date: '19/12/2020'}, 
    {id:1, name: 'Board2', description: 'asdfgh', creation_date: '15/12/2015'},
    {id:2, name: 'Board3', description: 'zxcvbn', creation_date: '11/08/2017'},
    {id:3, name: 'Board4', description: '123qwe', creation_date: '15/04/2003'},
    {id:4, name: 'Board5', description: 'asdqwe', creation_date: '06/03/2019'}]

  ngOnInit(): void {
  }



}
