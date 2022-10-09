import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitBtnComponent } from './components/submit-btn/submit-btn.component';
import { AccountBtnComponent } from './components/account-btn/account-btn.component';



@NgModule({
  declarations: [
    SubmitBtnComponent,
    AccountBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SubmitBtnComponent,
    AccountBtnComponent
  ]
})
export class SharedModule { }
