import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';

import { IconListComponent } from './icon-list.component';

describe('IconListComponent', () => {
  let component: IconListComponent;
  let fixture: ComponentFixture<IconListComponent>;
  let authServiceStab : Partial<AuthService> = {
    logout: () => {return of(false)}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconListComponent ],
      providers: [
        {provide: AuthService, useValue: authServiceStab}
      ]
    })
    .compileComponents();

    spyOn<any>(authServiceStab, 'logout')

    fixture = TestBed.createComponent(IconListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#logout', () => {
    it('trigger authService logout', () => {
      const button = fixture.debugElement.query(By.css('.last'))
      button.triggerEventHandler('click');
      expect(authServiceStab.logout).toHaveBeenCalled();
    })
  })
});
