import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardComponent } from './components/boards/board/board.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { MatIconModule } from '@angular/material/icon';
import { AdminComponent } from './admin.component';
import { BoardMenuComponent } from './components/board-menu/board-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { StatusBoardComponent } from './components/tasks/status-board/status-board.component';
import { SortByPipe } from './pipes/sort-by.pipe';



@NgModule({
  declarations: [
    IconListComponent,
    BoardsComponent,
    BoardComponent,
    TasksComponent,
    TaskComponent,
    AdminComponent,
    BoardMenuComponent,
    StatusBoardComponent,
    SortByPipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    AdminRoutingModule,
  ],
})
export class AdminModule { }
