import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FirebaseService } from '@core/firebase/firebase.service';
import { from, of } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { catchError, take, tap } from 'rxjs/operators';
import { StorageUrlCacheService } from '@core/storage-url-cache/storage-url-cache.service';

@Component({
  selector: 'app-project-image',
  templateUrl: './project-image.component.html',
  styleUrls: ['./project-image.component.scss']
})
export class ProjectImageComponent implements OnInit, OnChanges, OnDestroy {
  @Input() imageSrc: string;
  parsedSrc: string;

  constructor(
    private firebaseService: FirebaseService,
    private changeDetectorRef: ChangeDetectorRef,
    private storageUrlCacheService: StorageUrlCacheService
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.imageSrc) {
      this.parsedSrc = null;
      return;
    }

    const urlFromCache = this.storageUrlCacheService.getUrl(this.imageSrc);
    if (urlFromCache) {
      this.parsedSrc = urlFromCache;
    } else {
      from(this.firebaseService.storage.ref(this.imageSrc).getDownloadURL())
        .pipe(
          take(1),
          tap((val) => {
            this.parsedSrc = val;
            this.storageUrlCacheService.setUrl(this.imageSrc, val);
            this.changeDetectorRef.markForCheck();
          }),
          catchError((error) => {
            console.error('error', error);
            return of();
          }),
          untilDestroyed(this)
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
  }

}
