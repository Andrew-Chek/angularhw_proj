import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/Board';
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

  @Output() sentSortBoardParams = new EventEmitter<{propertyName: keyof Board, order: 'asc' | 'desc'}>();
  @Output() sentFilterData = new EventEmitter<string>();

  constructor(private popupService:PopupService) { }

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
      this.popupService.openCreateBoardForm();
    }
    else
    {
      this.popupService.openCreateTaskForm();
    }
  }
}
