import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPaths } from './app-paths';
import { AdminPaths } from '@admin/admin-paths';

const routes: Routes = [
  {path: '', redirectTo: AppPaths.Home, pathMatch: 'full'},
  {
    path: AppPaths.Home,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: AdminPaths.Admin,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
