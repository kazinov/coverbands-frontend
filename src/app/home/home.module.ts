import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    MatFormFieldModule,
  ],
  declarations: [HomeComponent]
})
export class HomeModule {

}
