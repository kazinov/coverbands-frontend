import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BandPaths } from './band-paths';
import { CreateBandComponent } from './create-band/create-band.component';

export const bandRoutes: Routes = [
  {path: '', redirectTo: BandPaths.Create, pathMatch: 'full'},
  {
    path: BandPaths.Create,
    component: CreateBandComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(bandRoutes)]
})
export class BandRoutingModule {
}
