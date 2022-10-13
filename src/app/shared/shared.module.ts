import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitBtnComponent } from './components/submit-btn/submit-btn.component';
import { AccountBtnComponent } from './components/account-btn/account-btn.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { FormHeaderComponent } from './components/form-header/form-header.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SubmitBtnComponent,
    AccountBtnComponent,
    FormFieldComponent,
    CustomFormComponent,
    FormHeaderComponent
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
    FormHeaderComponent
  ]
})
export class SharedModule { }
