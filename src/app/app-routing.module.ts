import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AuthGuard } from './features/auth/auth.guard';
import { AdminComponent } from './features/admin/admin.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'admin', component: AdminComponent,
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canLoad: [AuthGuard]
  },
  { 
    path: '', component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule 
{ 
  
}
