import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, merge, mergeMap, Observable, of, take } from 'rxjs';
import { Board } from 'src/app/Board';
import { Message } from 'src/app/Message';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  
  public openCreateBoard: boolean = false;
  public openMessage: boolean = false;
  public openEditBoard:boolean = false;
  public openDeleteBoard:boolean = false;
  public message$:Observable<Message> = this.adminService.message$;

  constructor(private adminService: AdminService, private router:Router) { }

  ngOnInit(): void {
    this.adminService.createFormSubject.subscribe((value: boolean) => this.openCreateBoard = value);
    this.adminService.editFormSubject.subscribe((value: boolean) => this.openEditBoard = value);
    this.adminService.deleteFormSubject.subscribe((value: boolean) => this.openDeleteBoard = value);
    this.adminService.displayMessageSubject
    .subscribe((value) => {
      this.message$ = value;
      this.openMessage = !this.openMessage
    });
  }

  ngOnDestroy()
  {
    this.adminService.createFormSubject.unsubscribe();
    this.adminService.displayMessageSubject.unsubscribe();
  }

  sendCreateRequest(board:Board)
  {
    this.adminService.createBoard(board).pipe(take(1)).subscribe(value => console.log(value))
    this.adminService.detectBoardsChange();
    this.adminService.openCreateBoardForm();
  }

  sendEditRequest(board:Board)
  {
    this.adminService.updateBoard(board).pipe(take(1)).subscribe(value => console.log(value));
    this.adminService.openEditBoardForm()
    this.adminService.currentBoardSubject.next({_id:'', name: '', description: '', created_date: new Date()});
    this.adminService.detectBoardsChange()
  }

  sendDeleteRequest(board:Board)
  {
    this.adminService.deleteBoard(board).pipe(take(1)).subscribe(value => console.log(value));
    this.adminService.openDeleteBoardForm()
    this.adminService.currentBoardSubject.next({_id:'', name: '', description: '', created_date: new Date()});
    this.adminService.detectBoardsChange()
  }
}
