import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { homePaths } from './home/home-paths';

const routes: Routes = [
  {path: '', redirectTo: homePaths.main, pathMatch: 'full'},
  {
    path: homePaths.main,
    loadChildren: './home/home.module#HomeModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
