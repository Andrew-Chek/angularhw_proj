import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BoardsComponent } from './components/boards/boards.component';
import { TasksComponent } from './components/tasks/tasks.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    redirectTo: '/admin',
  },
  {
    path: 'board/:id',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}