import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppPaths } from 'src/app/app-paths';
import { BandPaths } from '../../artist-admin/band-paths';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  AppPaths = AppPaths;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  get editBandUrl() {
    return `/${AppPaths.Band}/${BandPaths.Edit}/123`
  }

  get createBandUrl() {
    return `/${AppPaths.Band}/${BandPaths.Create}`
  }

  constructor(private breakpointObserver: BreakpointObserver) {}

}
