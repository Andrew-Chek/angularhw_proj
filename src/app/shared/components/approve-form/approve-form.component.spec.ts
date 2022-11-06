import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopupService } from '../../services/popupService/popup.service';
import { PopupServiceMock } from '../../services/popupService/popup.service.mock';

import { ApproveFormComponent } from './approve-form.component';

describe('ApproveFormComponent', () => {
  let component: ApproveFormComponent;
  let fixture: ComponentFixture<ApproveFormComponent>;
  let popupService: PopupServiceMock

  beforeEach(async () => {
    popupService = new PopupServiceMock()
    await TestBed.configureTestingModule({
      declarations: [ ApproveFormComponent ],
      providers: [
        {provide: PopupService, useValue: popupService}
      ]
    })
    .compileComponents();

    spyOn(popupService, 'closeDeleteForm')

    fixture = TestBed.createComponent(ApproveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#closePopup', () => {
    it('should raise closePopup after click', () => {
      const closeBtn = fixture.debugElement.query(By.css('.approve-icon'));
      closeBtn.triggerEventHandler('click');
      expect(popupService.closeDeleteForm).toHaveBeenCalled()
    })
  })

  describe('#sendData', () => {
    it('should raise sent data event after click', () => {
      const closeBtn = fixture.debugElement.query(By.css('.approve-ok'));
      let deleted = false;
      component.sentData.subscribe(value => deleted = value)
      closeBtn.triggerEventHandler('click');
      expect(deleted).toBeTrue();
    })
  })
});
