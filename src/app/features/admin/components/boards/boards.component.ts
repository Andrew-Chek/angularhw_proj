import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { mergeMap, Observable, of, Subscription } from 'rxjs';
import { Board } from 'src/app/Board';
import { Task } from 'src/app/Task';
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
  public propertyName: keyof Board = 'name';
  public sortFlag = false;
  public ascOrder: 'asc' | 'desc' = 'asc';

  openCreateForm()
  {
    this.popupService.openCreateBoardForm();
  }

  setSortValues(value: {propertyName: keyof Board, order: 'asc' | 'desc'})
  {
    this.sortFlag = true;
    this.ascOrder = value.order;
    this.propertyName = value.propertyName;
  }

  ngOnInit(): void {
    this.adminStateSubscription = this.adminService.state$.subscribe((value) => {
      console.log(`we are in boards: '${value.tasks}'`)
      this.boards$ = of(value.boards);
    })
  }
}
