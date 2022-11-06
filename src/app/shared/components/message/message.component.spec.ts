import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';

import { MessageComponent } from './message.component';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;
  let authServiceStab: Partial<AuthService> = {
    messageSubject: new BehaviorSubject<{isDisplayed: boolean, message: string, error: boolean}>({isDisplayed: false, message: 'value', error: false}),
    closeMessage: () => {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStab}
      ]
    })
    .compileComponents();

    spyOn<any>(authServiceStab, 'closeMessage')

    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  describe('#closePopup', () => {
    it('should raise closeMessage method', () => {
      component.closePopup();
      expect(authServiceStab.closeMessage).toHaveBeenCalled()
    })
    it('should raise closePopup method after click', () => {
      const closeBtn = fixture.debugElement.query(By.css('.message-icon'));
      closeBtn.triggerEventHandler('click');
      expect(authServiceStab.closeMessage).toHaveBeenCalled()
    })
  })
});
