import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { BoardComponent } from 'src/app/shared/testingData/componentMocks/boardMock';
import { DashboardHeaderComponent } from 'src/app/shared/testingData/componentMocks/dashboardHeaderMock';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { AdminService } from '../../admin.service';
import { SortByPipe } from '../../pipes/sort-by.pipe';

import { BoardsComponent } from './boards.component';

describe('BoardsComponent', () => {
  let component: BoardsComponent;
  let fixture: ComponentFixture<BoardsComponent>;
  let adminServiceStab: Partial<AdminService> = {
    boards$ : of(boards),
    state$ : of({tasks: [], boards: boards, board: boards[0], task: tasks[0]}),
    getBoards: () => {return of(boards)}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        BoardsComponent,
        DashboardHeaderComponent,
        BoardComponent,
        SortByPipe
      ],
      providers: [
        {provide: AdminService, useValue: adminServiceStab},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#filterBoards', () => {
    it('should return unchanged boards', () => {
      component.filterBoards('');
      expect(component.boards$).toEqual(adminServiceStab.boards$!);
    })

    it('should return filtered boards', () => {
      component.filterBoards('to');
      expect(component.boards$).not.toEqual(adminServiceStab.boards$!);
    })
  })
});
