import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ArtistTypeSelectModule } from '@shared/artist-type-select/artist-type-select.module';
import { CitySelectModule } from '@shared/city-select/city-select.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    CitySelectModule,
    ArtistTypeSelectModule,
    MatFormFieldModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule {

}
