import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from 'src/app/Board';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  constructor(private adminService:AdminService) {
    this.boards$ = this.adminService.getBoards();
   }

  public boards$:Observable<Board[]>;

  ngOnInit(): void {
  }
}
