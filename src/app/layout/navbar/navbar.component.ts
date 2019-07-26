import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArtistAdminPaths } from '@artist-admin/artist-admin-paths';
import { AppPaths } from '../../app-paths';
import { AdminPaths } from '@admin/admin-paths';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  AppPaths = AppPaths;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  get editBandUrl() {
    return `/${AdminPaths.Admin}/${ArtistAdminPaths.Artist}/${ArtistAdminPaths.Edit}/123`;
  }

  get createBandUrl() {
    return `/${AdminPaths.Admin}/${ArtistAdminPaths.Artist}/${ArtistAdminPaths.Create}`;
  }

  openAuthDialog() {
    this.authService.openAuthDialog();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {
  }

}
