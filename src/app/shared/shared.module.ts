import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { SubmitBtnComponent } from './components/submit-btn/submit-btn.component';
import { AccountBtnComponent } from './components/account-btn/account-btn.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';



@NgModule({
  declarations: [
    SubmitBtnComponent,
    AccountBtnComponent,
    FormFieldComponent,
    CustomFormComponent,
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [
    SubmitBtnComponent,
    AccountBtnComponent,
    FormFieldComponent,
    CustomFormComponent,
    AdminHeaderComponent
  ]
})
export class SharedModule implements NgModule { }
