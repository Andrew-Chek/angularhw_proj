import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/Board';
import { Task } from 'src/app/Task';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  constructor(private popupService:PopupService) { }

  ngOnInit(): void {
  }

  public headerType:string = ''
  public propertyName:keyof Board = 'name'
  public order: 'asc' | 'desc' = 'asc'

  @Output() sentSortParams = new EventEmitter<{propertyName: keyof Board, order: 'asc' | 'desc'}>();
  @Output() sentFilterData = new EventEmitter<string>();

  setPropertyName(value: keyof Board)
  {
    this.propertyName = value;
    if(this.headerType == 'Dashboard')
    {
      this.sentSortParams.emit({propertyName: this.propertyName, order: this.order})
    }
    else
    {
      this.popupService.sortParams.next({sortFlag: true, propertyName: this.propertyName, sortOrder: this.order})
    }
  }

  sendFilterData(value: string)
  {
    this.sentFilterData.emit(value);
  }

  setOrder(value:'asc' | 'desc')
  {
    this.order = value;
    if(this.headerType == 'Dashboard')
    {
      this.sentSortParams.emit({propertyName: this.propertyName, order: this.order})
    }
    else
    {
      this.popupService.sortParams.next({sortFlag: true, propertyName: this.propertyName, sortOrder: this.order})
    }
  }

  @Input()
  set setHeader(type: string)
  {
    this.headerType = type;
  }
  get setHeader()
  {
    return this.headerType;
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
