import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { mergeMap, Observable, of, Subscription } from 'rxjs';
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

  public boards$:Observable<Board[]> = this.boardsStateService.boards$;
  public propertyName: keyof Board = 'name';
  public sortFlag = false;
  public ascOrder: 'asc' | 'desc' = 'asc';

  private popupSubscription = new Subscription();

  constructor(private boardsStateService: BoardsStateService, private popupService: PopupService) {
  }

  ngOnInit(): void {
    this.popupSubscription = this.popupService.sortParams.subscribe(value => {
      this.sortFlag = true;
      this.ascOrder = value.sortOrder;
      this.propertyName = value.propertyName as keyof Board;
    })
  }

  ngOnDestroy(): void {
    this.popupSubscription.unsubscribe();
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
