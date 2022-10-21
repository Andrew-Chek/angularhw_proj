import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/Board';
import { AdminService } from 'src/app/features/admin/admin.service';

@Component({
  selector: 'app-approve-form',
  templateUrl: './approve-form.component.html',
  styleUrls: ['./approve-form.component.scss']
})
export class ApproveFormComponent implements OnInit {

  constructor(private adminService:AdminService) { }
  public board:Board = {_id:'', name: '', description: '', created_date: new Date()};

  ngOnInit(): void {
    this.adminService.currentBoardSubject.subscribe((value) => this.board = value);
  }

  closePopup()
  {
    this.adminService.openDeleteBoardForm();
  }

  deleteBoard()
  {
    this.adminService.deleteBoard(this.board).subscribe();
    this.adminService.openDeleteBoardForm()
    this.adminService.currentBoardSubject.next({_id:'', name: '', description: '', created_date: new Date()});
    this.adminService.detectBoardsChange()
  }
}
