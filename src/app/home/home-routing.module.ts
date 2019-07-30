import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { ResetPasswordGuard } from '@core/auth/reset-password.guard';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [
      ResetPasswordGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)]
})
export class HomeRoutingModule {
}
