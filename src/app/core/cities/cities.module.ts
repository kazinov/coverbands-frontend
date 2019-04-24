import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { citiesFeatureName, citiesReducer } from './cities.reducer';
import { CitiesEffects } from './cities.effects';
import { CitiesService } from './cities.service';
import { CitiesSelectors } from './cities.selectors';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(citiesFeatureName, citiesReducer),
    EffectsModule.forFeature([CitiesEffects]),
  ],
  providers: [
    CitiesService,
    CitiesSelectors
  ]
})
export class CitiesModule {
  constructor(@Optional() @SkipSelf() parentModule: CitiesModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
