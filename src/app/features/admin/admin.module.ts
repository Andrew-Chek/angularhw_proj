import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconListComponent } from './components/icon-list/icon-list.component';
import { BoardsComponent } from './components/boards/boards.component';
import { BoardComponent } from './components/boards/board/board.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/tasks/task/task.component';



@NgModule({
  declarations: [
    IconListComponent,
    BoardsComponent,
    BoardComponent,
    TasksComponent,
    TaskComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
