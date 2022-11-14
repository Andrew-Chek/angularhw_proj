import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Board } from 'src/app/shared/interfaces/Board';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { AdminService } from '../../../admin.service';

import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let adminServiceStab: Partial<AdminService> = {
    setCurrentBoard: (board: Board) => {}
  }
  let popupServiceStab: Partial<PopupService> = {
    openEditBoardForm: () => {},
    openDeleteBoardForm: () => {},
  }
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: AdminService, useValue: adminServiceStab},
        {provide: PopupService, useValue: popupServiceStab}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    spyOn<any>(adminServiceStab, 'setCurrentBoard');
    spyOn<any>(popupServiceStab, 'openEditBoardForm');
    spyOn<any>(popupServiceStab, 'openDeleteBoardForm');

    fixture = TestBed.createComponent(BoardComponent);
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

  describe('#goToTasks', () => {
    it('should trigger router.navigate method', () => {
      const element = fixture.debugElement.query(By.css('.general__name'))
      element.triggerEventHandler('click')
      expect(router.navigate).toHaveBeenCalled();
    })
  })

  describe('#openForms', () => {
    let elements: DebugElement[] 
    beforeEach(() => {
      elements = fixture.debugElement.queryAll(By.css('.more-list-item'))
    })
    it('should trigger editBoard service methods', () => {
      elements[0].triggerEventHandler('click');
      expect(adminServiceStab.setCurrentBoard).toHaveBeenCalled()
      expect(popupServiceStab.openEditBoardForm).toHaveBeenCalled()
    })

    it('should trigger deleteBoard service methods', () => {
      elements[1].triggerEventHandler('click');
      expect(adminServiceStab.setCurrentBoard).toHaveBeenCalled()
      expect(popupServiceStab.openDeleteBoardForm).toHaveBeenCalled()
    })
  })

});
