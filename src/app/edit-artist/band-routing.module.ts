import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BandPaths } from './band-paths';
import { CreateBandComponent } from './create-band/create-band.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';

export const bandRoutes: Routes = [
  {path: '', redirectTo: BandPaths.Create, pathMatch: 'full'},
  {
    path: BandPaths.Create,
    component: CreateBandComponent
  },
  {
    path: BandPaths.Edit + '/:id',
    component: EditArtistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(bandRoutes)]
})
export class BandRoutingModule {
}
