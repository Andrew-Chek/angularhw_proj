import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { task } from 'src/app/shared/testingData/taskMock'

import { TaskPageComponent } from './task-page.component';
import { TasksStateService } from '../../../services/tasks-state/tasks-state.service';
import { SortByPipe } from '../../../pipes/sort-by.pipe';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { PopupServiceMock } from 'src/app/shared/services/popupService/popup.service.mock';
import { Comment } from 'src/app/shared/interfaces/Comment';

@Component({
  selector: 'app-comment-form',
  template: '<div></div>'
})
export class CommentFormComponent{}


describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;
  let tasksStateServiceStab: Partial<TasksStateService> = {
    commentSubject: new BehaviorSubject<Comment>({_id: '', title: '', message: '', created_date: ''}),
    state$: of({tasks: tasks, task: task}),
    task$: of(task)
  }
  let popupService: PopupServiceMock;

  beforeEach(async () => {
    popupService = new PopupServiceMock();
    await TestBed.configureTestingModule({
      declarations: [ 
        TaskPageComponent,
        CommentFormComponent,
        SortByPipe
      ],
      providers: [
        {provide: TasksStateService, useValue: tasksStateServiceStab},
        {provide: PopupService, useValue: popupService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#openCommentForm', () => {
    it('should set isFormOpened to true', () => {
      component.openCommentForm(true);
      expect(component.isFormOpened).toBeTrue()
    })
  })

  describe('#openEditCommentForm', () => {
    it('should set isFormForEditOpened to true', () => {
      component.openEditCommentForm('');
      expect(component.isFormForEditOpened).toBeTrue()
    })
  })

  describe('#closeCommentForm', () => {
    it('should set isFormOpened to false', () => {
      component.closeCommentForm();
      expect(component.isFormOpened).toBeFalse()
      expect(component.isFormForEditOpened).toBeFalse()
    })
  })

  describe('#filterComments', () => {
    it('should set proper comments', () => {
      component.filterComments('new');
      fixture.detectChanges();
      component.comments$.subscribe(comments => {
        expect(comments).toEqual([{_id: '', title: 'new title', message: 'new message', created_date: ''}])
      })
    })

    it('should set current comments', () => {
      component.filterComments('');
      fixture.detectChanges();
      component.comments$.subscribe(comments => {
        expect(comments).toEqual(task.comments)
      })
    })
  })
});
