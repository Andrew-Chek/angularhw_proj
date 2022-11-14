import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopupService } from '../../services/popupService/popup.service';
import { PopupServiceMock } from '../../services/popupService/popup.service.mock';

import { TaskFormComponent } from './task-form.component';
import { SubmitBtnComponent } from '../../testingData/componentMocks/submitMock';
import { TasksStateService } from 'src/app/features/dashboard/services/tasks-state/tasks-state.service';
import { BoardsStateService } from 'src/app/features/dashboard/services/boards-state/boards-state.service';
import { of } from 'rxjs';
import { tasks } from '../../testingData/tasksMock';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let popupService: PopupServiceMock;
  let tasksStateServiceStab: Partial<TasksStateService> = {
    state$: of({tasks: tasks, task: tasks[0]})
  };
  let boardsStateServiceStab: Partial<BoardsStateService> = {};

  beforeEach(async () => {
    popupService = new PopupServiceMock()
    await TestBed.configureTestingModule({
      declarations: [ 
        TaskFormComponent,
        SubmitBtnComponent
      ],
      providers: [
        {provide: PopupService, useValue: popupService},
        {provide: TasksStateService, useValue: tasksStateServiceStab},
        {provide: BoardsStateService, useValue: boardsStateServiceStab}
      ]
    })
    .compileComponents();

    spyOn(popupService, 'openEditTaskForm')
    spyOn(popupService, 'openCreateTaskForm')

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  describe('#get properties', () => {
    it('get name', () => {
      expect(component.name?.value).toEqual('')
    })

    it('get description', () => {
      expect(component.description?.value).toEqual('')
    })

    it('get status', () => {
      expect(component.status?.value).toEqual('To do')
    })
  })

  describe('#closePopup', () => {
    it('should raise closePopup for create task method after click', () => {
      component.submitText = 'Create task';
      fixture.detectChanges();
      const closeBtn = fixture.debugElement.query(By.css('.task-icon'));
      closeBtn.triggerEventHandler('click');
      expect(popupService.openCreateTaskForm).toHaveBeenCalled()
    })

    it('should raise closePopup for edit task method after click', () => {
      component.submitText = 'Edit Task';
      fixture.detectChanges();
      const closeBtn = fixture.debugElement.query(By.css('.task-icon'));
      closeBtn.triggerEventHandler('click');
      expect(popupService.openEditTaskForm).toHaveBeenCalled()
    })
  })

  describe('#formWork', () => {
    it('test a form group element count', () => {
      const formElement = fixture.debugElement.nativeElement.querySelector('.task-form')
      const inputElements = formElement.querySelectorAll('.form-input')
      expect(inputElements.length).toEqual(3)
    })

    it('check initial form values', () => {
      const formGroup = component.taskForm;
      const formValues = {
        name: '',
        description: '',
        status: 'To do'
      }
      expect(formGroup.value).toEqual(formValues);
    })

    it('check input values when entering data', () => {
      const formElement = fixture.debugElement.nativeElement.querySelector('.task-form')
      const nameElement = formElement.querySelectorAll('.form-input')[0]
      nameElement.value = 'test value';
      const formGroupNameValue = component.name;
      formGroupNameValue?.setValue('test value');
      expect(formGroupNameValue?.value).toEqual(nameElement.value)
    })
  })
});
