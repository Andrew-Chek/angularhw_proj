import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, Observable, of, Subscription, tap } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { BoardsStateService } from '../../services/boards-state/boards-state.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardsComponent implements OnInit, OnDestroy {

  public boards$:Observable<Board[]> = new Observable();
  public propertyName: keyof Board = 'name';
  public sortFlag = false;
  public ascOrder: 'asc' | 'desc' = 'asc';

  private subscriptions: Subscription[] = [];

  constructor(private boardsStateService: BoardsStateService, private popupService: PopupService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const routeSubsription = this.activeRoute.data
    .pipe(
      tap(value => {
        this.boardsStateService.setCurrentBoards(value['boards']);
    })).subscribe()

    this.boards$ = this.boardsStateService.boards$;

    const popupSubscription = this.popupService.sortParams.subscribe(value => {
      this.sortFlag = true;
      this.ascOrder = value.sortOrder;
      this.propertyName = value.propertyName as keyof Board;
    })

    this.subscriptions.push(routeSubsription);
    this.subscriptions.push(popupSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  filterBoards(value: string)
  {
    if(value == '')
    {
      this.boards$ = this.boardsStateService.boards$;
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

  openCreateBoardForm(openInfo: boolean)
  {
    if(openInfo)
    {
      this.boardsStateService.setCurrentBoard({_id: '', name: '', description: '', created_date: ''})
      this.popupService.openCreateBoardForm()
    }
  }
}
