import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { ArtistAdminPaths } from '@artist-admin/artist-admin-paths';
import { AuthGuard } from '@core/auth/auth.guard';
import { ADMIN_PART_ROUTE_ID } from '@admin/admin-paths';

export const artistAdminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [
      AuthGuard
    ],
    children: [
      {path: '', redirectTo: ArtistAdminPaths.Artist, pathMatch: 'full'},
      {
        path: ArtistAdminPaths.Artist,
        loadChildren: () => import('./artist-admin/artist-admin.module')
          .then(m => m.ArtistAdminModule)
      },
    ],
    data: {
      id: ADMIN_PART_ROUTE_ID
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(artistAdminRoutes)]
})
export class AdminRoutingModule {
}
