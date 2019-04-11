import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPaths } from './app-paths';

const routes: Routes = [
  {path: '', redirectTo: AppPaths.Home, pathMatch: 'full'},
  {
    path: AppPaths.Home,
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: AppPaths.Band,
    loadChildren: './band/band.module#BandModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
