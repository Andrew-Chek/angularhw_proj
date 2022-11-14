import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from 'src/app/shared/interfaces/Board';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';
import { Task } from 'src/app/shared/interfaces/Task';
import { Comment } from '../../interfaces/Comment';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardHeaderComponent implements OnInit {

  @Input() headerType:string = '';
  @Input() addText = 'Add new';
  @Input() isTaskPage = false
  public propertyName: keyof Board | keyof Task | keyof Comment = 'name';
  public order: 'asc' | 'desc' = 'asc'

  @Output() sentFilterData = new EventEmitter<string>();
  @Output() sentOpenForm = new EventEmitter<boolean>();

  constructor(private popupService:PopupService) {
  }

  ngOnInit(): void {
  }

  setPropertyName(value: keyof Board | keyof Task | keyof Comment)
  {
    this.propertyName = value;
    this.popupService.sortParams.next({sortFlag: true, propertyName: this.propertyName, sortOrder: this.order})
  }

  sendFilterData(value: string)
  {
    this.sentFilterData.emit(value);
  }

  setOrder(value:'asc' | 'desc')
  {
    this.order = value;
    this.popupService.sortParams.next({sortFlag: true, propertyName: this.propertyName, sortOrder: this.order})
  }

  openCreateForm()
  {
    this.sentOpenForm.emit(true)
  }
}
