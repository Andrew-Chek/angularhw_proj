import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AdminService } from 'src/app/features/admin/admin.service';
import { AdminServiceMock } from 'src/app/features/admin/admin.service.mock';
import { PopupService } from '../../services/popupService/popup.service';
import { PopupServiceMock } from '../../services/popupService/popup.service.mock';
import { SubmitBtnComponent } from '../../testingData/componentMocks/submitMock';

import { BoardFormComponent } from './board-form.component';

describe('BoardFormComponent', () => {
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;
  let popupService: PopupServiceMock;
  let adminService: AdminServiceMock;

  beforeEach(async () => {
    popupService = new PopupServiceMock()
    adminService = new AdminServiceMock()
    await TestBed.configureTestingModule({
      declarations: [ 
        BoardFormComponent,
        SubmitBtnComponent
      ],
      providers: [
        {provide: PopupService, useValue: popupService},
        {provide: AdminService, useValue: adminService}
      ]
    })
    .compileComponents();

    spyOn(popupService, 'openEditBoardForm')
    spyOn(popupService, 'openCreateBoardForm')

    fixture = TestBed.createComponent(BoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#get properties', () => {
    it('get name', () => {
      expect(component.name?.value).toEqual('')
    })

    it('get description', () => {
      expect(component.description?.value).toEqual('')
    })
  })

  describe('#closePopup', () => {
    it('should raise closePopup for create board method after click', () => {
      component.submitText = 'Create Board';
      fixture.detectChanges();
      const closeBtn = fixture.debugElement.query(By.css('.board-icon'));
      closeBtn.triggerEventHandler('click');
      expect(popupService.openCreateBoardForm).toHaveBeenCalled()
    })

    it('should raise closePopup for edit board method after click', () => {
      component.submitText = 'Edit Board';
      fixture.detectChanges();
      const closeBtn = fixture.debugElement.query(By.css('.board-icon'));
      closeBtn.triggerEventHandler('click');
      expect(popupService.openEditBoardForm).toHaveBeenCalled()
    })
  })

  describe('#formWork', () => {
    it('test a form group element count', () => {
      const formElement = fixture.debugElement.nativeElement.querySelector('.board-form')
      const inputElements = formElement.querySelectorAll('.form-input')
      expect(inputElements.length).toEqual(2)
    })

    it('check initial form values', () => {
      const formGroup = component.boardForm;
      const formValues = {
        name: '',
        description: '',
      }
      expect(formGroup.value).toEqual(formValues);
    })

    it('check input values when entering data', () => {
      const formElement = fixture.debugElement.nativeElement.querySelector('.board-form')
      const nameElement = formElement.querySelectorAll('.form-input')[0]
      nameElement.value = 'test value';
      const formGroupNameValue = component.name;
      formGroupNameValue?.setValue('test value');
      expect(formGroupNameValue?.value).toEqual(nameElement.value)
    })
  })
});
