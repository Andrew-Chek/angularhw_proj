import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Task } from 'src/app/shared/interfaces/Task';
import { PopupService } from '../../services/popupService/popup.service';
import { PopupServiceMock } from '../../services/popupService/popup.service.mock';

import { DashboardHeaderComponent } from './dashboard-header.component';

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;
  let popupService: PopupServiceMock;

  beforeEach(async () => {
    popupService = new PopupServiceMock()
    await TestBed.configureTestingModule({
      declarations: [ 
        DashboardHeaderComponent
      ],
      providers: [
        {provide: PopupService, useValue: popupService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#headerType', () => {
    it('should set expected headerType', () => {
      component.headerType = 'Dashboard'
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.dashboard-title') as HTMLElement;
      title.innerText = component.headerType;
      expect(title.innerText).toEqual('Dashboard');
    });

    it('should set empty headerType', () => {
      component.headerType = ''
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.dashboard-title') as HTMLElement;
      expect(title.textContent).toEqual('');
    });
  })

  describe('#setProperName', () => {
    it('should set expected name in sorting', () => {
      component.headerType = 'Dashboard'
      fixture.detectChanges();
      component.setPropertyName('created_date')
      fixture.detectChanges();
      expect(component.propertyName).toEqual('created_date');
    });

    it('should update popupservice sort state when clicked with expected data', () => {
      let sortData!: {propertyName: keyof Task, sortOrder: 'asc' | 'desc', sortFlag: boolean};
      const expectedSortData: {propertyName: keyof Task, sortOrder: 'asc' | 'desc', sortFlag: boolean} 
        = {propertyName: 'created_date', sortOrder: 'asc', sortFlag: true};
    
      const sortDropdownFlag = fixture.debugElement.query(By.css('.dropdown-sort'));
      sortDropdownFlag.triggerEventHandler('click');
      sortData = popupService.sortParams.getValue();
      expect(sortData).toEqual(expectedSortData);
    });
  })

  describe('#setOrder', () => {
    it('should set expected order in sorting', () => {
      component.headerType = 'Dashboard'
      fixture.detectChanges();
      component.setOrder('desc')
      fixture.detectChanges();
      expect(component.order).toEqual('desc');
    });

    it('should update popupservice sort state when clicked with expected data', () => {
      let sortData!: {propertyName: keyof Task, sortOrder: 'asc' | 'desc', sortFlag: boolean};
      const expectedSortData: {propertyName: keyof Task, sortOrder: 'asc' | 'desc', sortFlag: boolean} 
        = {propertyName: 'name', sortOrder: 'desc', sortFlag: true};
      component.headerType = 'Name of board';
      fixture.detectChanges();
    
      const sortDropdownFlags = fixture.debugElement.queryAll(By.css('.tools-li-order .sort-hover'));
      sortDropdownFlags[1].triggerEventHandler('click');
      sortData = popupService.sortParams.getValue();
      expect(sortData).toEqual(expectedSortData);
    });
  })

  describe('#openCreateForm', () => {
    it('should emit sentOpenForm', () => {
      component.openCreateForm()
      component.sentOpenForm.subscribe(value => {
        expect(value).toBeTrue()
      })
    });
  })
});
