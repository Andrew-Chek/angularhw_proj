import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { BoardComponent } from 'src/app/shared/testingData/componentMocks/boardMock';
import { DashboardHeaderComponent } from 'src/app/shared/testingData/componentMocks/dashboardHeaderMock';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { BoardsStateService } from '../../services/boards-state/boards-state.service';

import { BoardsComponent } from './boards.component';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;
  let boardsStateServiceStab: Partial<BoardsStateService> = {
    boards$ : of(boards),
    state$ : of({tasks: [], boards: boards, board: boards[0], task: tasks[0]}),
    getBoards: () => {return of(boards)},
    setCurrentBoard: (board: Board) => {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        BoardsComponent,
        DashboardHeaderComponent,
        BoardComponent,
        SortByPipe
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: BoardsStateService, useValue: boardsStateServiceStab},
      ]
    })
    .compileComponents();

    spyOn<any>(boardsStateServiceStab, 'setCurrentBoard')

    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#filterBoards', () => {
    it('should return unchanged boards', () => {
      component.filterBoards('');
      expect(component.boards$).toEqual(boardsStateServiceStab.boards$!);
    })

    it('should return filtered boards', () => {
      component.filterBoards('to');
      expect(component.boards$).not.toEqual(boardsStateServiceStab.boards$!);
    })
  })

  describe('#openCreateBoardForm', () => {
    it('should call service method', () => {
      component.openCreateBoardForm(true);
      expect(boardsStateServiceStab.setCurrentBoard).toHaveBeenCalled()
    })
  })
});
