import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  public time:string = new Date().toLocaleString();

  constructor() { }

  ngOnInit(): void {
    setInterval(() => {
      this.time = new Date().toLocaleString()
    }, 1000)
  }

}
