import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

const RATIO = 1.77777777778;

@Component({
  selector: 'app-embedded-video',
  templateUrl: './embedded-video.component.html',
  styleUrls: ['./embedded-video.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbeddedVideoComponent implements OnInit {
  @Input() src: string;
  @Input() width: number;
  @Input() height: number;
  @Input() allowFullScreen: boolean;

  constructor(private sanitizer: DomSanitizer) {
  }

  get srcSanitized() {

    // TODO: think about possible dangers
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }

  ngOnInit() {
    if (this.width) {
      this.height = this.width / RATIO;
    } else if (this.height) {
      this.width = this.height * RATIO;
    } else {
      this.width = 560;
      this.height = 315;
    }
  }

}
