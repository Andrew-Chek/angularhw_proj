import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PopupService } from 'src/app/shared/services/popupService/popup.service';

@Component({
  selector: 'app-approve-form',
  templateUrl: './approve-form.component.html',
  styleUrls: ['./approve-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApproveFormComponent implements OnInit {

  constructor(private popupService:PopupService) { }
  
  @Output() sentData = new EventEmitter<boolean>(false);

  public visible = false;

  ngOnInit(): void {
    this.popupService.state$.subscribe(value => {
      this.visible = value.openDelete
    })
  }

  closePopup()
  {
    this.popupService.closeDeleteForm();
  }

  sendData()
  {
    this.sentData.emit(true);
  }
}
