import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TasksStateService } from 'src/app/features/dashboard/services/tasks-state/tasks-state.service';
import { Comment } from 'src/app/shared/interfaces/Comment';
import { Task } from 'src/app/shared/interfaces/Task';

import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let tasksStateServiceStab: Partial<TasksStateService> = {
    commentSubject: new BehaviorSubject<Comment>({_id: '', title: '', message: '', created_date: ''}),
    updateTask: () => {},
    createComment: (comment: Comment, task: Task) => {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentFormComponent ],
      imports: [FormsModule],
      providers: [
        {provide: TasksStateService, useValue: tasksStateServiceStab}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    spyOn<any>(component.strategy, 'updateComments')
    fixture.detectChanges();
  });

  describe('#Form logic', () => {
    beforeEach(() => {
      const inputElements : HTMLInputElement[] = fixture.debugElement.nativeElement.querySelectorAll('.form-control')
      inputElements[0].value = ''
      inputElements[1].value = ''
    })
    it('test a form group element count', () => {
      const inputElements = fixture.debugElement.nativeElement.querySelectorAll('.form-control')
      expect(inputElements.length).toEqual(2)
    })

    it('check initial form values', () => {
      const inputElements : HTMLInputElement[] = fixture.debugElement.nativeElement.querySelectorAll('.form-control')
      expect(inputElements[0].value).toEqual('');
      expect(inputElements[1].value).toEqual('');
    })

    it('check updateTrigger after correct submit', () => {
      const inputElements = fixture.debugElement.queryAll(By.css('.form-control'))
      inputElements.forEach(element => {
        element.nativeElement.value = 'test title';
        fixture.detectChanges();
      });
      component.task = {_id: '', name: '', comments: [], status: '', created_date: '', board_id: '', assigned_to: '', isArchived: false, description: ''}
      component.onSubmit()
      expect(component.strategy.updateComments).toHaveBeenCalled()
    })
  })
});
