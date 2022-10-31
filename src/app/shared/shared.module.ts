import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { SubmitBtnComponent } from './components/submit-btn/submit-btn.component';
import { CustomFormComponent } from './components/custom-form/custom-form.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageComponent } from './components/message/message.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ApproveFormComponent } from './components/approve-form/approve-form.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';



@NgModule({
  declarations: [
    SubmitBtnComponent,
    CustomFormComponent,
    AdminHeaderComponent,
    BoardFormComponent,
    MessageComponent,
    TaskFormComponent,
    ApproveFormComponent,
    DashboardHeaderComponent,
    PageNotFoundComponent,
    DragAndDropDirective,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  exports: [
    SubmitBtnComponent,
    CustomFormComponent,
    AdminHeaderComponent,
    BoardFormComponent,
    MessageComponent,
    TaskFormComponent,
    ApproveFormComponent,
    DashboardHeaderComponent,
    DragAndDropDirective
  ]
})
export class SharedModule implements NgModule { }
