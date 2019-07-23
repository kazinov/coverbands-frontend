import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FirebaseService } from '@core/firebase/firebase.service';

@NgModule({
  providers: [FirebaseService],
  bootstrap: []
})
export class FirebaseModule {
  constructor(@Optional() @SkipSelf() parentModule?: FirebaseModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
