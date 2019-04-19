import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { musicGenresFeatureName, musicGenresReducer } from './music-genres.reducer';
import { MusicGenresService } from './music-genres.service';
import { MusicGenresEffects } from './music-genres.effects';
import { MusicGenresSelectors } from './music-genres.selectors';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(musicGenresFeatureName, musicGenresReducer),
    EffectsModule.forFeature([MusicGenresEffects]),
  ],
  providers: [
    MusicGenresService,
    MusicGenresSelectors
  ]
})
export class MusicGenresModule {
  constructor(@Optional() @SkipSelf() parentModule: MusicGenresModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
