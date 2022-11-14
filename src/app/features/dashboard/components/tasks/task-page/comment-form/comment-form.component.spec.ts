import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AdminService } from 'src/app/features/admin/admin.service';

import { CommentFormComponent } from './comment-form.component';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;
  let adminServiceStab: Partial<AdminService> = {
    updateTask: () => {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentFormComponent ],
      imports: [FormsModule],
      providers: [
        {provide: AdminService, useValue: adminServiceStab}
      ]
    })
    .compileComponents();

    spyOn<any>(adminServiceStab, 'updateTask')

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#Form logic', () => {
    it('test a form group element count', () => {
      const inputElements = fixture.debugElement.nativeElement.querySelectorAll('.form-control')
      expect(inputElements.length).toEqual(2)
    })

    it('check initial form values', () => {
      const inputElements : HTMLInputElement[] = fixture.debugElement.nativeElement.querySelectorAll('.form-control')
      inputElements.forEach(element => {
        expect(element.value).toEqual('');
      });
    })

    it('check updateTrigger after correct submit', () => {
      const inputElements = fixture.debugElement.queryAll(By.css('.form-control'))
      inputElements.forEach(element => {
        element.nativeElement.value = 'test value';
        fixture.detectChanges();
      });
      component.task = {_id: '', name: '', comments: [], status: '', created_date: '', board_id: '', assigned_to: '', isArchived: false, description: ''}
      component.onSubmit()
      expect(adminServiceStab.updateTask).toHaveBeenCalled()
    })
  })
});
