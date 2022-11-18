import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './features/auth/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard', component: DashboardComponent,
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    // canLoad: [AuthGuard]
  },
  {
    path: '', 
    pathMatch: 'full', 
    redirectTo: '/dashboard',
  },
  { 
    path: 'notfound', 
    pathMatch: 'full', 
    component: PageNotFoundComponent 
  },
  {
    path: '**', 
    pathMatch: 'full', 
    redirectTo: '/notfound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{ 
  
}
