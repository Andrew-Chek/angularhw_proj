import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderComponent } from './admin-header.component';

describe('AdminHeaderComponent', () => {
  let component: AdminHeaderComponent;
  let fixture: ComponentFixture<AdminHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#username', () => {
    it('should set expected username', () => {
      component.username = 'test username'
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.admin-title') as HTMLElement;
      expect(title.textContent).toContain(component.username);
    });

    it('should set empty username', () => {
      component.username = ''
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.admin-title') as HTMLElement;
      expect(title.textContent).toEqual('Welcome back, ');
    });
  })
});
