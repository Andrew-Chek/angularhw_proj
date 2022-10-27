import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopupService } from '../../popup.service';

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

  @Output()
  sentDropDownParams = new EventEmitter<string>();

  sortByDropDown()
  {
    
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
    if(this.headerType == 'board')
    {
      this.popupService.openCreateBoardForm();
    }
    else
    {
      this.popupService.openCreateTaskForm();
    }
  }
}
