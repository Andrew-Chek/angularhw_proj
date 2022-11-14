import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { BoardsStateService } from '../../services/boards-state/boards-state.service';

import { BoardMenuComponent } from './board-menu.component';

describe('BoardMenuComponent', () => {
  let component: BoardMenuComponent;
  let fixture: ComponentFixture<BoardMenuComponent>;
  let router: Router;
  let boardsStateServiceStab: Partial<BoardsStateService> = {
    state$ : of({ boards: boards, board: boards[0]}),
    getBoards: () => {return of(boards)}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardMenuComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: BoardsStateService, useValue: boardsStateServiceStab}
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

  describe('#goToTasks', () => {
    it('should trigger router.navigate method', () => {
      component.goToTasks({_id: '', name: '', created_date: '', description: ''});
      expect(router.navigate).toHaveBeenCalled();
    })
  })
});
