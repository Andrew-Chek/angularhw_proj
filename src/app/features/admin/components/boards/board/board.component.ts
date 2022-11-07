import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Message } from 'src/app/Message';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { Board } from '../../../../../Board'
import { Task } from 'src/app/Task';
import { AdminService } from '../../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  @Input() board:Board = {_id: '', name:'', description: '', created_date: ''};

  public tasks:Task[] = [];
  public message$:Observable<Message> = new Observable();
  public isPressed:boolean = false;

  private adminStateSubscription = new Subscription();

  constructor(private adminService: AdminService, 
    private popupService: PopupService, private router: Router) {
  }

  ngOnInit(): void {
  }

  openMore()
  {
    this.isPressed = !this.isPressed;
    setTimeout(() => {
      this.isPressed = false;
    }, 10000)
  }

  ngOnDestroy()
  {
    this.adminStateSubscription.unsubscribe();
  }
  
  setTasks()
  {
    this.router.navigate(['admin/board', this.board._id])
  }

  openEditForm()
  {
    this.adminService.setCurrentBoard({...this.board});
    this.popupService.openEditBoardForm();
  }

  openDeleteBoardForm()
  {
    this.adminService.setCurrentBoard({...this.board});
    this.popupService.openDeleteBoardForm();
  }
}
