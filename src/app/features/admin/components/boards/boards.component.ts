import { Component, OnInit, OnDestroy } from '@angular/core';
import { mergeMap, Observable, of, Subscription } from 'rxjs';
import { Board } from 'src/app/Board';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit, OnDestroy {

  public boards$:Observable<Board[]>;
  public propertyName: keyof Board = 'name';
  public sortFlag = false;
  public ascOrder: 'asc' | 'desc' = 'asc';

  private adminStateSubscription = new Subscription();

  constructor(public adminService: AdminService, private popupService: PopupService) {
    this.boards$ = this.adminService.boards$;
  }

  ngOnInit(): void {
    this.adminStateSubscription = this.adminService.state$.subscribe((value) => {
      this.boards$ = of(value.boards);
    })
  }

  ngOnDestroy(): void {
    this.adminStateSubscription.unsubscribe();
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
}
