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

  describe('#Input buttonText', () => {
    it('should set button text properly', () => {
      component.style = true;
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('.account-btn')).nativeElement;
      const expectedText = 'Test text';

      component.buttonText = expectedText;
      fixture.detectChanges();
      expect(element.textContent).toContain(expectedText);
    });
  })

  describe('#Input style', () => {
    it('should set class according to flag in component', () => {
      component.style = false;
      fixture.detectChanges();
      const element = fixture.debugElement.query(By.css('.submit-btn')).nativeElement;
      expect(element).toBeTruthy();
    });
  })

  describe('#onClick', () => {
    it('should raise emit event', () => {
      const button = fixture.debugElement.query(By.css('.submit-btn'));
      button.triggerEventHandler('click');
      expect(component.onClick).toHaveBeenCalled();
    });
  })
});
