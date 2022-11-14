import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminService } from '../../../admin.service';
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

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let adminServiceStab: Partial<AdminService> = {
    setCurrentTask: (task: Task) => {},
    setCurrentBoard: (board: Board) => {},
    getBoard: (id: string) => {return of(boards[0])},
    updateTask: (task: Task) => {}
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
        {provide: AdminService, useValue: adminServiceStab},
        {provide: PopupService, useValue: popupServiceStab}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router)
    spyOn(router, 'navigate');
    spyOn<any>(adminServiceStab, 'setCurrentTask');
    spyOn<any>(adminServiceStab, 'updateTask');
    spyOn<any>(adminServiceStab, 'getBoard');

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
      expect(adminServiceStab.getBoard).toHaveBeenCalled()
    })

    it('should trigger deleteTask service methods', () => {
      elements[1].triggerEventHandler('click');
      expect(adminServiceStab.getBoard).toHaveBeenCalled()
    })

    it('should trigger openTaskPage service methods', () => {
      const element = fixture.debugElement.query(By.css('.general__name'))
      element.triggerEventHandler('click');
      expect(adminServiceStab.setCurrentTask).toHaveBeenCalled()
      expect(router.navigate).toHaveBeenCalled()
    })

    it('should trigger archiveTask service methods', () => {
      elements[2].triggerEventHandler('click');
      expect(adminServiceStab.updateTask).toHaveBeenCalled()
    })
  })
});
