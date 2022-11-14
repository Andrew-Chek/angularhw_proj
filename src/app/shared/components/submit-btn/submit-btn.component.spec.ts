import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SubmitBtnComponent } from './submit-btn.component';

describe('SubmitBtnComponent', () => {
  let component: SubmitBtnComponent;
  let fixture: ComponentFixture<SubmitBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(component, 'onClick')
  });

  describe('#onClick', () => {
    it('should raise emit event', () => {
      const button = fixture.debugElement.query(By.css('.submit-btn'));
      button.triggerEventHandler('click');
      expect(component.onClick).toHaveBeenCalled();
    });
  })
});
