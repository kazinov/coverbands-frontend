import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ARTIST_STORE_KEY } from '@core/artist/artist.model';
import { artistReducer } from '@core/artist/artist.reducer';
import { ArtistSelectors } from '@core/artist/artist.selectors';

@NgModule({
  imports: [
    StoreModule.forFeature(ARTIST_STORE_KEY, artistReducer),
  ],
  providers: [
    ArtistSelectors
  ]
})
export class ArtistModule {
  constructor(@Optional() @SkipSelf() parentModule?: ArtistModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
