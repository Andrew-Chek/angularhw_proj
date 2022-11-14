import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { PopupServiceMock } from 'src/app/shared/services/popupService/popup.service.mock';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { Task } from 'src/app/shared/interfaces/Task';

import { DashboardComponent } from './dashboard.component';
import { BoardsStateService } from './services/boards-state/boards-state.service';
import { TasksStateService } from './services/tasks-state/tasks-state.service';
import { BoardFormComponent } from 'src/app/shared/testingData/componentMocks/boardFormMock';
import { TaskFormComponent } from 'src/app/shared/testingData/componentMocks/taskFormMock';
import { ApproveFormComponent } from 'src/app/shared/testingData/componentMocks/approveFormMock';
import { AdminHeaderComponent, BoardMenuComponent, IconListComponent } from 'src/app/shared/testingData/componentMocks/dumbComponentMocks';
import { Board } from 'src/app/shared/interfaces/Board';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let tasksStateServiceStab: Partial<TasksStateService> = {
    tasks$: of(tasks),
    board$ : of(boards[0]),
    state$ : of({tasks: tasks, boards: boards, board: boards[0], task: tasks[0]}),
    setCurrentTask: (task: Task) => {},
  }
  let boardsStateServiceStab: Partial<BoardsStateService> = {
    board$ : of(boards[0]),
    state$ : of({tasks: tasks, boards: boards, board: boards[0], task: tasks[0]}),
    createBoard: (board: Board) => {}
  }
  let popupService: PopupServiceMock
  let spyPopup : PopupServiceMock;
  let spyTasksState : Partial<TasksStateService>;
  let spyBoardsState : Partial<BoardsStateService>;

  beforeEach(async () => {
    popupService = new PopupServiceMock();
    spyPopup = jasmine.createSpyObj(popupService);
    spyTasksState = jasmine.createSpyObj(tasksStateServiceStab);
    spyBoardsState = jasmine.createSpyObj(boardsStateServiceStab);
    const testedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzRlYjljZjM0M2U3YzZhMjcxNzNmZWUiLCJlbWFpbCI6ImFuZHJpaV9jaGVrdXJkYUBlcGFtLmNvbSIsImNyZWF0ZWRfZGF0ZSI6IjIwMjItMTAtMThUMTQ6MzU6NTkuMTEwWiIsImlhdCI6MTY2NjEwMzk1NX0.8itS5nL6Oolb-moUkQXolfz5P4KRJHaSPJ08WhiQb1M'
    window.localStorage.setItem('jwt_token', testedToken)
    await TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent,
        BoardFormComponent,
        TaskFormComponent,
        ApproveFormComponent,
        AdminHeaderComponent,
        IconListComponent,
        BoardMenuComponent
      ],
      providers: [
        {provide: TasksStateService, useValue: tasksStateServiceStab},
        {provide: BoardsStateService, useValue: boardsStateServiceStab},
        {provide: PopupService, useValue: popupService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#sendCreateBoardRequest', () => {
    it('#should trigger service methods', () => {
      component.sendCreateBoardRequest(boards[0]);
      expect(spyPopup.openCreateBoardForm).toHaveBeenCalled()
    })
  })
});

