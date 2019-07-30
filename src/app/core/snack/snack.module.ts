import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackService } from '@core/snack/snack.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    SnackService
  ]
})
export class SnackModule {
  constructor(@Optional() @SkipSelf() parentModule: SnackModule) {
    if (parentModule) {
      throw new Error(
        'Module is already loaded. Import it only once');
    }
  }
}
