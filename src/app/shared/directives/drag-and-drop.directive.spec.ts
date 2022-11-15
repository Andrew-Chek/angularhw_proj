import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusBoardComponent } from '../testingData/componentMocks/statusBoardMock';
import { TasksStateService } from 'src/app/features/dashboard/services/tasks-state/tasks-state.service';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { of } from 'rxjs';
import { tasks } from '../testingData/tasksMock';
import { PopupServiceMock } from '../services/popupService/popup.service.mock';

describe('DragAndDropDirective', () => {
  let component: StatusBoardComponent;
  let tasksStateServiceStab: Partial<TasksStateService> = {
    tasks$: of(tasks),
    
  }
  const popupService = new PopupServiceMock()
  const elementRef = new ElementRef(document.querySelector('.status-board-task'))
  let directive: DragAndDropDirective;
  let fixture: ComponentFixture<StatusBoardComponent>;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ 
        StatusBoardComponent,
      ],
      providers: [
        {provide: TasksStateService, useValue: tasksStateServiceStab},
        {provide: ElementRef, useValue: elementRef},
        DragAndDropDirective
      ]
    })
    .createComponent(StatusBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    directive = TestBed.inject(DragAndDropDirective);
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
