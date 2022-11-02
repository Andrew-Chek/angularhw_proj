import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  public time:string = new Date().toLocaleString();
  
  @Input() username: string = ''

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toLocaleString()
    }, 1000)
  }
}
