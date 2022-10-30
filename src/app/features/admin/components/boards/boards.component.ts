import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { map, mergeMap, Observable, of, Subscription, take } from 'rxjs';
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
  public propertyName: keyof Board = 'name';
  public sortFlag = false;
  public ascOrder: 'asc' | 'desc' = 'asc';

  openCreateForm()
  {
    this.adminService.setCurrentBoard({_id: '', name: '', description: '', created_date: ''})
    this.popupService.openCreateBoardForm();
  }

  filterBoards(value: string)
  {
    if(value == '')
    {
      this.boards$ = this.adminService.boards$;
    }
    else
    {
      this.boards$ = this.boards$.pipe(
        mergeMap(boards => {
          const filteredArray = boards.filter(function(board) {
            return board.name.includes(value)
          });
          return of(filteredArray);
      }))
    }
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
