import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from './translation.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    TranslationService
  ]
})
export class TranslationModule {
  constructor(@Optional() @SkipSelf() parentModule: TranslationModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
