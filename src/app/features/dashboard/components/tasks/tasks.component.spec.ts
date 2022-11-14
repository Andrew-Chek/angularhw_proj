import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { BoardsStateService } from '../../services/boards-state/boards-state.service';
import { TasksStateService } from '../../services/tasks-state/tasks-state.service';
import { TasksComponent } from './tasks.component';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let router: Router
  let tasksStateServiceStab: Partial<TasksStateService> = {
    tasks$: of(tasks),
    board$ : of(boards[0]),
    state$ : of({tasks: tasks, boards: boards, board: boards[0], task: tasks[0]})
  }
  let boardsStateServiceStab: Partial<BoardsStateService> = {
    board$ : of(boards[0]),
    state$ : of({tasks: tasks, boards: boards, board: boards[0], task: tasks[0]})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: TasksStateService, useValue: tasksStateServiceStab},
        {provide: BoardsStateService, useValue: boardsStateServiceStab}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#filterTasks', () => {
    it('should return unchanged tasks', () => {
      component.filterTasks('');
      expect(component.tasks$).toEqual(tasksStateServiceStab.tasks$!);
    })

    it('should return filtered tasks', () => {
      component.filterTasks('to');
      expect(component.tasks$).not.toEqual(tasksStateServiceStab.tasks$!);
    })
  })
});
