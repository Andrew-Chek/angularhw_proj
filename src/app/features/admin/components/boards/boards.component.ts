import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { mergeMap, Observable, of, Subscription } from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/popup.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {

  constructor(public adminService: AdminService, private popupService: PopupService) {
    this.boards$ = this.adminService.boards$;
  }
  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe();
  }

  public boards$:Observable<Board[]>;
  public adminStateSubscription = new Subscription();

  openCreateForm()
  {
    this.popupService.openCreateBoardForm();
  }

  sortByDropDown()
  {
    
  }

  compareDates = (d1: Date, d2: Date):boolean => {
    let date1 = new Date(d1).getTime();
    let date2 = new Date(d2).getTime();
    return date1 > date2;
  };

  ngOnInit(): void {
    this.adminStateSubscription = this.adminService.state$.subscribe((value) => {
      console.log(`we are in boards: '${value.tasks}'`)
      this.boards$ = of(value.boards);
    })
  }
}
