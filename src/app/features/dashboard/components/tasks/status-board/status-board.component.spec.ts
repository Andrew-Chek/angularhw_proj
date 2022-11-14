import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksStateService } from '../../../services/tasks-state/tasks-state.service';
import { Task } from 'src/app/shared/interfaces/Task';

import { StatusBoardComponent } from './status-board.component';
import { PopupServiceMock } from 'src/app/shared/services/popupService/popup.service.mock';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { SortByPipe } from '../../../pipes/sort-by.pipe';
import { of } from 'rxjs';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task',
  template: '<div></div>'
})
export class TaskComponent {}

describe('StatusBoardComponent', () => {
  let component: StatusBoardComponent;
  let fixture: ComponentFixture<StatusBoardComponent>;
  let tasksStateServiceStab: Partial<TasksStateService> = {
    tasks$: of(tasks),
    setCurrentTask: (task: Task) => {}
  }
  let popupService: PopupServiceMock

  beforeEach(async () => {
    popupService = new PopupServiceMock();
    await TestBed.configureTestingModule({
      declarations: [ 
        StatusBoardComponent,
        TaskComponent,
        SortByPipe
      ],
      providers: [
        {provide: TasksStateService, useValue: tasksStateServiceStab},
        {provide: PopupService, useValue: popupService},
      ]
    })
    .compileComponents();

    spyOn(popupService, 'setColor')
    spyOn(popupService, 'openCreateTaskForm')
    spyOn<any>(tasksStateServiceStab, 'setCurrentTask')

    fixture = TestBed.createComponent(StatusBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.status = {value: 'To do', color: '#ffffff'}
    fixture.detectChanges();
  });

  describe('#setColor', () => {
    it('should trigger popup method', () => {
      component.setColor('#000000')
      expect(popupService.setColor).toHaveBeenCalled()
    })
  })

  describe('#openCreateTaskForm', () => {
    it('should trigger popup and taskState service methods', () => {
      component.openCreateTaskForm()
      expect(tasksStateServiceStab.setCurrentTask).toHaveBeenCalled()
      expect(popupService.openCreateTaskForm).toHaveBeenCalled()
    })
  })
});
