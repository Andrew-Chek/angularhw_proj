import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { task } from 'src/app/shared/testingData/taskMock';
import { AdminService } from '../../../admin.service';

import { TaskPageComponent } from './task-page.component';

@Component({
  selector: 'app-comment-form',
  template: '<div></div>'
})
export class CommentFormComponent{}


describe('TaskPageComponent', () => {
  let component: TaskPageComponent;
  let fixture: ComponentFixture<TaskPageComponent>;
  let adminServiceStab: Partial<AdminService> = {
    state$: of({tasks: tasks, boards: boards, task: task, board: boards[0]})
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        TaskPageComponent,
        CommentFormComponent
      ],
      providers: [
        {provide: AdminService, useValue: adminServiceStab}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#openCommentForm', () => {
    it('should set isFormOpened to true', () => {
      
      component.openCommentForm();
      expect(component.isFormOpened).toBeTrue()
    })
  })
});
