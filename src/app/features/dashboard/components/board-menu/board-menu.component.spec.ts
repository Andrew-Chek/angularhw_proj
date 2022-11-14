import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { DashboardState } from 'src/app/shared/interfaces/Store';
import { AdminService } from '../../admin.service';

import { BoardMenuComponent } from './board-menu.component';

describe('BoardMenuComponent', () => {
  let component: BoardMenuComponent;
  let fixture: ComponentFixture<BoardMenuComponent>;
  let router: Router;
  let serviceMock: Partial<AdminService> = {
    state$ : of({tasks: [], boards: boards, board: boards[0], task: tasks[0]}),
    getBoards: () => {return of(boards)}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardMenuComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: AdminService, useValue: serviceMock}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate')

    fixture = TestBed.createComponent(BoardMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#openBoardList', () => {
    it('should open board list and set proper flags', () => {
      const element = fixture.debugElement.query(By.css('.board-menu-label'));
      element.triggerEventHandler('click');
      expect(component.bList).toBeTrue();
    })
  })

  describe('#openTaskList', () => {
    it('should open task list and set proper flags', () => {
      const element = fixture.debugElement.queryAll(By.css('.board-menu-label'));
      element[1].triggerEventHandler('click');
      expect(component.tList).toBeTrue();
    })
  })

  describe('#setTasks', () => {
    it('should trigger router.navigate method', () => {
      component.goToTasks({_id: '', name: '', created_date: '', description: ''});
      expect(router.navigate).toHaveBeenCalled();
    })
  })
});
