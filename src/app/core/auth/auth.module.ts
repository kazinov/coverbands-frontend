import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AUTH_STORE_KEY } from '@core/auth/auth.model';
import { authReducer } from '@core/auth/auth.reducer';
import { AuthSelectors } from '@core/auth/auth.selectors';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '@core/auth/auth.effects';
import { AuthService } from '@core/auth/auth.service';

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_STORE_KEY, authReducer),
    EffectsModule.forFeature([
      AuthEffects
    ])
  ],
  providers: [
    AuthSelectors,
    AuthService
  ],
  bootstrap: []
})
export class AuthModule {
  constructor(@Optional() @SkipSelf() parentModule?: AuthModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
