import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StorageUrlCacheService } from '@core/storage-url-cache/storage-url-cache.service';

@NgModule({
  providers: [
    StorageUrlCacheService
  ]
})
export class StorageUrlCacheModule {
  constructor(@Optional() @SkipSelf() parentModule?: StorageUrlCacheModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
