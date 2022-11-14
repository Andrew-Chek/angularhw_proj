import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Task } from 'src/app/shared/interfaces/Task';
import { TaskComponent } from './task.component';
import { of } from 'rxjs';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Board } from 'src/app/shared/interfaces/Board';
import { TasksStateService } from '../../../services/tasks-state/tasks-state.service';
import { BoardsStateService } from '../../../services/boards-state/boards-state.service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let tasksStateServiceStab: Partial<TasksStateService> = {
    setCurrentTask: (task: Task) => {},
    updateTask: (task: Task) => {}
  }
  let boardsStateServiceStab: Partial<BoardsStateService> = {
    setCurrentBoard: (board: Board) => {},
    getBoard: (id: string) => {return of(boards[0])}
  }
  let popupServiceStab: Partial<PopupService> = {
    openEditTaskForm: () => {},
    openDeleteTaskForm: () => {}
  }
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: TasksStateService, useValue: tasksStateServiceStab},
        {provide: BoardsStateService, useValue: boardsStateServiceStab},
        {provide: PopupService, useValue: popupServiceStab}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router)
    spyOn(router, 'navigate');
    spyOn<any>(tasksStateServiceStab, 'setCurrentTask');
    spyOn<any>(tasksStateServiceStab, 'updateTask');
    spyOn<any>(boardsStateServiceStab, 'getBoard');

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#openMore', () => {
    it('should set isPressed to true', () => {
      const element = fixture.debugElement.query(By.css('.more-icon'))
      element.triggerEventHandler('click')
      expect(component.isPressed).toBeTrue();
    })
  })

  describe('#trigger proper events and methods', () => {
    let elements: DebugElement[] 
    beforeEach(() => {
      elements = fixture.debugElement.queryAll(By.css('.more-list-item'))
    })

    it('should trigger editTask service methods', () => {
      elements[0].triggerEventHandler('click');
      expect(boardsStateServiceStab.getBoard).toHaveBeenCalled()
    })

    it('should trigger deleteTask service methods', () => {
      elements[1].triggerEventHandler('click');
      expect(boardsStateServiceStab.getBoard).toHaveBeenCalled()
    })

    it('should trigger openTaskPage service methods', () => {
      const element = fixture.debugElement.query(By.css('.general__name'))
      element.triggerEventHandler('click');
      expect(tasksStateServiceStab.setCurrentTask).toHaveBeenCalled()
      expect(router.navigate).toHaveBeenCalled()
    })

    it('should trigger archiveTask service methods', () => {
      elements[2].triggerEventHandler('click');
      expect(tasksStateServiceStab.updateTask).toHaveBeenCalled()
    })
  })
});
