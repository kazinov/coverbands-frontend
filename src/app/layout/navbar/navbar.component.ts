import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArtistAdminPaths, CREATE_ARTIST_URL } from '@artist-admin/artist-admin-paths';
import { AppPaths } from '../../app-paths';
import { AdminPaths } from '@admin/admin-paths';

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

  get artistsUrl() {
    return `/${AdminPaths.Admin}/${ArtistAdminPaths.Artist}/${ArtistAdminPaths.List}`;
  }

  get createArtistUrl() {
    return CREATE_ARTIST_URL;
  }

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
  }

}
