import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BoardsComponent } from './components/boards/boards.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { PageNotFoundComponent } from 'src/app/shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: BoardsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    redirectTo: '',
  },
  {
    path: 'board/:id',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    component: PageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}