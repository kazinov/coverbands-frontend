import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BandPaths } from './band-paths';
import { CreateBandComponent } from './create-band/create-band.component';
import { EditBandComponent } from './edit-band/edit-band.component';

export const bandRoutes: Routes = [
  {path: '', redirectTo: BandPaths.Create, pathMatch: 'full'},
  {
    path: BandPaths.Create,
    component: CreateBandComponent
  },
  {
    path: BandPaths.Edit + '/:id',
    component: EditBandComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(bandRoutes)]
})
export class BandRoutingModule {
}
