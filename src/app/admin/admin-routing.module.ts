import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { ArtistAdminPaths } from '@artist-admin/artist-admin-paths';

export const artistAdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {path: '', redirectTo: ArtistAdminPaths.Artist, pathMatch: 'full'},
      {
        path: ArtistAdminPaths.Artist,
        loadChildren: () => import('./artist-admin/artist-admin.module')
          .then(m => m.ArtistAdminModule)
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(artistAdminRoutes)]
})
export class AdminRoutingModule {
}
