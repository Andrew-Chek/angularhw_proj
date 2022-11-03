import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './features/auth/auth.guard';
import { AdminComponent } from './features/admin/admin.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin', component: AdminComponent,
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    // canLoad: [AuthGuard]
  },
  {
    path: '', 
    pathMatch: 'full',
    redirectTo: '/admin',
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    component: PageNotFoundComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{ 
  
}
