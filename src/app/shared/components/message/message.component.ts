import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdminService } from 'src/app/features/admin/admin.service';
import { Message } from 'src/app/Message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private adminService:AdminService) {
    this.adminService.message$.subscribe((message) => {
      this.text = message.message;
    })
   }

  public message$: Observable<Message> = this.adminService.message$;
  public text:string = ''

  closePopup()
  {
    const message:Observable<Message> = of({isDisplayed: false, message: ''})
    this.adminService.openMessageBlock(message);
  }

  ngOnInit(): void {
    this.adminService.displayMessageSubject.subscribe(value => {this.message$ = value
      value.subscribe((message) => {this.text = message.message});
    })
  }

}
