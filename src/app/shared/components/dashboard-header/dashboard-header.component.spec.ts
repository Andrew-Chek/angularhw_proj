import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';
import { Board } from 'src/app/Board';
import { Task } from 'src/app/Task';
import { AdminService } from 'src/app/features/admin/admin.service';
import { AdminServiceMock } from 'src/app/features/admin/admin.service.mock';
import { PopupService } from '../../services/popupService/popup.service';
import { PopupServiceMock } from '../../services/popupService/popup.service.mock';

import { DashboardHeaderComponent } from './dashboard-header.component';

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;
  let popupService: PopupServiceMock;
  let adminService: AdminServiceMock;

  beforeEach(async () => {
    popupService = new PopupServiceMock()
    adminService = new AdminServiceMock()
    await TestBed.configureTestingModule({
      declarations: [ 
        DashboardHeaderComponent
      ],
      providers: [
        {provide: PopupService, useValue: popupService},
        {provide: AdminService, useValue: adminService}
      ]
    })
    .compileComponents();

    spyOn(adminService, 'setCurrentBoard')
    spyOn(adminService, 'setCurrentTask')
    spyOn(popupService, 'openCreateBoardForm')
    spyOn(popupService, 'openCreateTaskForm')

    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#headerType', () => {
    it('should set expected headerType', () => {
      component.headerType = 'Dashboard'
      fixture.detectChanges();
      const title = fixture.nativeElement.querySelector('.dashboard-title') as HTMLElement;
      expect(title.textContent).toContain('Dashboard');
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

    it('should raise sentSortBoardParams event when clicked with expected data', () => {
      let sortData!: {propertyName: keyof Board, order: 'asc' | 'desc'};
      const expectedSortData: {propertyName: keyof Board, order: 'asc' | 'desc'} = {propertyName: 'created_date', order: 'asc'};
      component.headerType = 'Dashboard';
      fixture.detectChanges();
      component.sentSortBoardParams.pipe(first())
      .subscribe((updatedSortingData: {propertyName: keyof Board, order: 'asc' | 'desc'}) => sortData = updatedSortingData);
    
      const sortDropdownFlag = fixture.debugElement.query(By.css('.dropdown-sort'));
      sortDropdownFlag.triggerEventHandler('click');
      expect(sortData).toEqual(expectedSortData);
    });
    
    it('should raise sentSortBoardParams event when clicked with expected data(multiple times)', () => {
      let sortData!: {propertyName: keyof Board, order: 'asc' | 'desc'};
      const expectedSortData: {propertyName: keyof Board, order: 'asc' | 'desc'} = {propertyName: 'name', order: 'asc'};
      component.headerType = 'Dashboard';
      fixture.detectChanges();

      component.sentSortBoardParams.subscribe((updatedSortingData: {propertyName: keyof Board, order: 'asc' | 'desc'}) => sortData = updatedSortingData);
    
      const sortDropdownFlag = fixture.debugElement.query(By.css('.dropdown-sort'));
      sortDropdownFlag.triggerEventHandler('click');

      const sortNameFlag = fixture.debugElement.query(By.css('.name-sort'));
      sortNameFlag.triggerEventHandler('click');

      expect(sortData).toEqual(expectedSortData);
    });

    it('should update popupservice sort state when clicked with expected data', () => {
      let sortData!: {propertyName: keyof Task, sortOrder: 'asc' | 'desc', sortFlag: boolean};
      const expectedSortData: {propertyName: keyof Task, sortOrder: 'asc' | 'desc', sortFlag: boolean} 
        = {propertyName: 'created_date', sortOrder: 'asc', sortFlag: true};
      component.headerType = 'Name of board';
      fixture.detectChanges();
    
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

    it('should raise sentSortBoardParams event when clicked with expected data', () => {
      let sortData!: {propertyName: keyof Board, order: 'asc' | 'desc'};
      const expectedSortData: {propertyName: keyof Board, order: 'asc' | 'desc'} = {propertyName: 'name', order: 'desc'};
      component.headerType = 'Dashboard';
      fixture.detectChanges();
      component.sentSortBoardParams.pipe(first())
      .subscribe((updatedSortingData: {propertyName: keyof Board, order: 'asc' | 'desc'}) => sortData = updatedSortingData);
    
      const sortDropdownFlags = fixture.debugElement.queryAll(By.css('.tools-list-li-order .sort-hover'));
      sortDropdownFlags[1].triggerEventHandler('click');
      expect(sortData).toEqual(expectedSortData);
    });
    
    it('should raise sentSortBoardParams event when clicked with expected data(multiple times)', () => {
      let sortData!: {propertyName: keyof Board, order: 'asc' | 'desc'};
      const expectedSortData: {propertyName: keyof Board, order: 'asc' | 'desc'} = {propertyName: 'name', order: 'asc'};
      component.headerType = 'Dashboard';
      fixture.detectChanges();
      component.sentSortBoardParams
      .subscribe((updatedSortingData: {propertyName: keyof Board, order: 'asc' | 'desc'}) => sortData = updatedSortingData);
    
      const sortDropdownFlags = fixture.debugElement.queryAll(By.css('.tools-list-li-order .sort-hover'));
      sortDropdownFlags[1].triggerEventHandler('click');
      sortDropdownFlags[0].triggerEventHandler('click');
      expect(sortData).toEqual(expectedSortData);
    });

    it('should update popupservice sort state when clicked with expected data', () => {
      let sortData!: {propertyName: keyof Task, sortOrder: 'asc' | 'desc', sortFlag: boolean};
      const expectedSortData: {propertyName: keyof Task, sortOrder: 'asc' | 'desc', sortFlag: boolean} 
        = {propertyName: 'name', sortOrder: 'desc', sortFlag: true};
      component.headerType = 'Name of board';
      fixture.detectChanges();
    
      const sortDropdownFlags = fixture.debugElement.queryAll(By.css('.tools-list-li-order .sort-hover'));
      sortDropdownFlags[1].triggerEventHandler('click');
      sortData = popupService.sortParams.getValue();
      expect(sortData).toEqual(expectedSortData);
    });
  })

  describe('#openCreateForm', () => {
    it('should open board form', () => {
      component.headerType = 'Dashboard'
      fixture.detectChanges();
      component.openCreateForm()
      expect(adminService.setCurrentBoard).toHaveBeenCalled()
      expect(popupService.openCreateBoardForm).toHaveBeenCalled()
    });

    it('should open task form', () => {
      component.headerType = 'Name of board'
      fixture.detectChanges();
      component.openCreateForm()
      expect(adminService.setCurrentTask).toHaveBeenCalled()
      expect(popupService.openCreateTaskForm).toHaveBeenCalled()
    });
  })
});
