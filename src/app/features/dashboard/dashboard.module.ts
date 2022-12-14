import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardComponent } from './components/boards/board/board.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { MatIconModule } from '@angular/material/icon';
import { BoardMenuComponent } from './components/board-menu/board-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatusBoardComponent } from './components/tasks/status-board/status-board.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { TaskPageComponent } from './components/tasks/task-page/task-page.component';
import { CommentFormComponent } from './components/tasks/task-page/comment-form/comment-form.component';
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    IconListComponent,
    BoardsComponent,
    BoardComponent,
    TasksComponent,
    TaskComponent,
    DashboardComponent,
    BoardMenuComponent,
    StatusBoardComponent,
    SortByPipe,
    TaskPageComponent,
    CommentFormComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    DashboardRoutingModule,
    CommonModule,
    MatIconModule
  ],
})
export class DashboardModule { }
