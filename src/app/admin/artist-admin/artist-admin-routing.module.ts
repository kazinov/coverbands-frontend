import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { ArtistAdminPaths } from './artist-admin-paths';
import { EditArtistComponent } from './edit-artist/edit-artist/edit-artist.component';
import { ArtistListComponent } from '@artist-admin/artist-list/artist-list.component';

export const artistAdminRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: ArtistAdminPaths.Create,
        pathMatch: 'full'
      },
      {
        path: ArtistAdminPaths.Create,
        component: CreateArtistComponent
      },
      {
        path: ArtistAdminPaths.Edit + '/:id',
        component: EditArtistComponent
      },
      {
        path: ArtistAdminPaths.List,
        component: ArtistListComponent
      }
    ],

  },
];

@NgModule({
  imports: [RouterModule.forChild(artistAdminRoutes)]
})
export class ArtistAdminRoutingModule {
}
