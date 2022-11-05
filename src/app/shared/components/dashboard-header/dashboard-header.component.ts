import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from 'src/app/Board';
import { AdminService } from 'src/app/features/admin/admin.service';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input() headerType:string = ''
  public propertyName:keyof Board = 'name'
  public order: 'asc' | 'desc' = 'asc'
  public currentRouteId!: string;

  @Output() sentSortBoardParams = new EventEmitter<{propertyName: keyof Board, order: 'asc' | 'desc'}>();
  @Output() sentFilterData = new EventEmitter<string>();

  constructor(private popupService:PopupService, protected adminService: AdminService, 
      private router: Router, private route: ActivatedRoute) {
    const snapshot = route.snapshot;
    this.currentRouteId = snapshot.paramMap.get('id')!
  }

  ngOnInit(): void {
  }

  setPropertyName(value: keyof Board)
  {
    this.propertyName = value;
    this.headerType == 'Dashboard' ? this.sentSortBoardParams.emit({propertyName: this.propertyName, order: this.order}) 
      : this.popupService.sortParams.next({sortFlag: true, propertyName: this.propertyName, sortOrder: this.order})
  }

  sendFilterData(value: string)
  {
    this.sentFilterData.emit(value);
  }

  setOrder(value:'asc' | 'desc')
  {
    this.order = value;
    this.headerType == 'Dashboard' ? this.sentSortBoardParams.emit({propertyName: this.propertyName, order: this.order}) 
      : this.popupService.sortParams.next({sortFlag: true, propertyName: this.propertyName, sortOrder: this.order})
  }

  openCreateForm()
  {
    if(this.headerType == 'Dashboard')
    {
      this.adminService.setCurrentBoard({_id: '', name: '', description: '', created_date: ''})
      this.router.navigateByUrl('/admin')
      this.popupService.openCreateBoardForm();
    }
    else
    {
      this.adminService.setCurrentTask({_id: '', name: '', description: '', assigned_to: '', board_id: '', isArchived: false, status: 'To do', comments: [], created_date: ''})
      this.popupService.openCreateTaskForm();
    }
  }
}
