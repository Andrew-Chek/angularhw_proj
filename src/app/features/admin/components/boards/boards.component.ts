import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { mergeMap, Observable, of } from 'rxjs';
import { Board } from 'src/app/Board';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  constructor(public adminService:AdminService) {
    this.boards$ = this.adminService.boards$;
   }

  public boards$:Observable<Board[]>;

  openCreateForm()
  {
    this.adminService.openCreateBoardForm();
  }

  ngOnInit(): void {
    this.adminService.displayBoardsSubject.subscribe((value) => this.boards$ = value)
  }
}
