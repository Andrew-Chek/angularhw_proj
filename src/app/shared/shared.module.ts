import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { SubmitBtnComponent } from './components/submit-btn/submit-btn.component';
import { AccountBtnComponent } from './components/account-btn/account-btn.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ApproveFormComponent } from './components/approve-form/approve-form.component';



@NgModule({
  declarations: [
    SubmitBtnComponent,
    AccountBtnComponent,
    FormFieldComponent,
    CustomFormComponent,
    AdminHeaderComponent,
    BoardFormComponent,
    MessageComponent,
    TaskFormComponent,
    ApproveFormComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    SubmitBtnComponent,
    AccountBtnComponent,
    FormFieldComponent,
    CustomFormComponent,
    AdminHeaderComponent,
    BoardFormComponent,
    MessageComponent,
    TaskFormComponent,
    ApproveFormComponent
  ]
})
export class SharedModule implements NgModule { }
