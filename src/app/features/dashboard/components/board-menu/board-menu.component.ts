import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { BoardsStateService } from '../../services/boards-state/boards-state.service';

@Component({
  selector: 'app-board-menu',
  templateUrl: './board-menu.component.html',
  styleUrls: ['./board-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardMenuComponent implements OnInit, OnDestroy {
  public bList = false;

  public boards$:Observable<Board[]> = this.boardsStateService.getBoards();
  
  constructor(private boardsStateService:BoardsStateService, private router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  goToTasks(board:Board)
  {
    this.router.navigate(['dashboard/board', board._id])
  }

  openBoardList()
  {
    this.bList = !this.bList;
  }
}
