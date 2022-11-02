import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { concatMap, Observable, of, Subscription } from 'rxjs';
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
    this.adminService.displayMessageSubject.unsubscribe();
  }
  
  setTasks()
  {
    this.adminService.getTasks(this.board._id).pipe(
      concatMap(value => {
        return this.adminService.getBoard(this.board._id)
      }),
      concatMap((value) => {
        return of("Succesfully set")
      })
    ).subscribe(value => {
      setTimeout(() => {
        this.router.navigate(['/board', this.board._id])
      }, 150)
    })
  }

  openEditForm()
  {
    this.adminService.setCurrentBoard({...this.board});
    this.popupService.openEditBoardForm();
  }

  openDeleteForm()
  {
    this.adminService.setCurrentBoard({...this.board});
    this.popupService.openDeleteBoardForm();
  }
}
