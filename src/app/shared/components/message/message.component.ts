import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminService } from 'src/app/features/admin/admin.service';
import { AuthService } from 'src/app/features/auth/auth.service';
import { Message } from 'src/app/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  public isDisplayed = false;
  public message:string = '';
  public error = false;

  constructor(private authService:AuthService) {
   }

   ngOnInit(): void {
    this.authService.messageSubject.subscribe(value => {
      this.message = value.message;
      this.isDisplayed = value.isDisplayed;
      this.error = value.error;
    })
  }

  closePopup()
  {
    this.authService.closeMessage();
  }
}
