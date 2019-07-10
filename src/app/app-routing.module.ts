import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPaths } from './app-paths';

const routes: Routes = [
  {path: '', redirectTo: AppPaths.Home, pathMatch: 'full'},
  {
    path: AppPaths.Home,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: AppPaths.Band,
    loadChildren: () => import('./artist-admin/artist-admin.module').then(m => m.ArtistAdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
