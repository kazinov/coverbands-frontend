import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FirebaseService } from '@core/firebase/firebase.service';
import { from } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { take, tap } from 'rxjs/operators';
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
    const urlFromCache = this.storageUrlCacheService.getUrl(this.imageSrc);
    if (urlFromCache) {
      this.imageSrc = urlFromCache;
    } else {
      from(this.firebaseService.storage.ref(this.imageSrc).getDownloadURL())
        .pipe(
          take(1),
          tap((val) => {
            this.parsedSrc = val;
            this.storageUrlCacheService.setUrl(this.imageSrc, val);
            this.changeDetectorRef.markForCheck();
          }),
          untilDestroyed(this)
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
  }

}
