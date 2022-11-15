import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BoardsComponent } from './components/boards/boards.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskPageComponent } from './components/tasks/task-page/task-page.component';
import { BoardResolver } from './resolvers/board-resolver/board.resolver';
import { TasksResolver } from './resolvers/tasks-resolver/tasks.resolver';
import { BoardsResolver } from './resolvers/boards-resolver/boards.resolver';


const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
    canActivate: [AuthGuard],
    resolve: {
      boards: BoardsResolver,
    },
  },
  {
    path: 'boards',
    redirectTo: '',
  },
  {
    path: 'board/:id',
    component: TasksComponent,
    resolve: {
      board: BoardResolver,
      tasks: TasksResolver
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'task/:id',
    component: TaskPageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}