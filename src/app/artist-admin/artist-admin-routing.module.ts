import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import { ArtistAdminPaths } from './artist-admin-paths';

export const artistAdminRoutes: Routes = [
  {path: '', redirectTo: ArtistAdminPaths.Create, pathMatch: 'full'},
  {
    path: ArtistAdminPaths.Create,
    component: CreateArtistComponent
  },
  {
    path: ArtistAdminPaths.Edit + '/:id',
    component: EditArtistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(artistAdminRoutes)]
})
export class ArtistAdminRoutingModule {
}
