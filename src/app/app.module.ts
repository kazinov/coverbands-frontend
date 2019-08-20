import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppLayoutModule } from './layout/app-layout.module';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FirebaseModule } from '@core/firebase/firebase.module';
import { AuthModule } from '@core/auth/auth.module';
import { SnackModule } from '@core/snack/snack.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
import { ArtistModule } from '@core/artist/artist.module';
import { StorageUrlCacheModule } from '@core/storage-url-cache/storage-url-cache.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    AppLayoutModule,
    AuthModule,
    FirebaseModule,
    SnackModule,
    ArtistModule,
    StorageUrlCacheModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: environment.production ? {} : {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true
      }
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {
        width: '600px',
        disableClose: true,
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
