import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { CitySelectComponent } from './city-select.component';


@NgModule({
  declarations: [CitySelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ],
  exports: [
    CitySelectComponent
  ]
})
export class CitySelectModule {
}
