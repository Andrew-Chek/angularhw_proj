import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { Board } from '../../../../../shared/interfaces/Board'
import { Router } from '@angular/router';
import { BoardsStateService } from '../../../services/boards-state/boards-state.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit, OnDestroy {

  @Input() board:Board = {_id: '', name:'', description: '', created_date: ''};
  public isPressed:boolean = false;

  constructor(private boardsStateService: BoardsStateService, 
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
  }
  
  goToTasks()
  {
    this.router.navigate(['dashboard/board', this.board._id])
  }

  openEditForm()
  {
    this.boardsStateService.setCurrentBoard({...this.board});
    this.popupService.openEditBoardForm();
  }

  openDeleteBoardForm()
  {
    this.boardsStateService.setCurrentBoard({...this.board});
    this.popupService.openDeleteBoardForm();
  }
}
