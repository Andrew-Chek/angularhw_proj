import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
  ) { }

  openRegisterPopup()
  {
    const registerPopup : any = document.querySelector('#register');
    registerPopup.style.transform = 'translate(0, -100%)';
  }
}
