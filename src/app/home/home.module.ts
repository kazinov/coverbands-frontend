import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ArtistTypeSelectModule } from '@shared/artist-type-select/artist-type-select.module';
import { CitySelectModule } from '@shared/city-select/city-select.module';
import { MusicGenreSelectModule } from '@shared/music-genre-select/music-genre-select.module';
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
    MusicGenreSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {

}
