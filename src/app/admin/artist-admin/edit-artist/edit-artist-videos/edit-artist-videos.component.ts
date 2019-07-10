import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { VideoLink } from '@core/artist/artist.model';
import { ALL_VIDEO_PROVIDERS, VideoProviders } from '@core/models/video-providers.model';
import { SelectorOption } from '@shared/utils/selector-option';
import { TranslationService } from '@core/translation/translation.service';
import { parseEmbeddedVideoSrc } from '@shared/utils/parse-embedded-video-src';
import { videoEmbedFormatValidator } from '@artist-admin/edit-artist/edit-artist-videos/video-embed-format.validator';

const DEFAULT_PROVIDER = VideoProviders.Youtube;

@Component({
  selector: 'app-edit-artist-videos',
  templateUrl: './edit-artist-videos.component.html',
  styleUrls: ['./edit-artist-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistVideosComponent implements OnInit {
  @Input() videos: VideoLink[];
  @Output() videosChange = new EventEmitter<VideoLink[]>();
  form: FormGroup;
  @ViewChild('formGroup', {static: true}) formGroup: FormGroupDirective;
  tableColumns: string[] = ['link', 'remove'];

  videoProviders: SelectorOption[]
    = ALL_VIDEO_PROVIDERS.map((provider) => ({
    id: provider,
    label: this.translationService.translateVideoProvider(provider)
  }));

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.form = this.formBuilder.group({
      provider: [DEFAULT_PROVIDER, [Validators.required]],
      link: ['', [videoEmbedFormatValidator, Validators.required]]
    });
  }

  onLinkSubmit() {
    const formValue: VideoLink = this.form.value;
    formValue.link = parseEmbeddedVideoSrc(formValue.link);

    this.videos = [
      ...(this.videos || []),
      this.form.value
    ];

    this.videosChange.emit(this.videos);
    this.form.reset();
    this.formGroup.resetForm();
    this.form.patchValue({
      provider: DEFAULT_PROVIDER
    });
  }

  onLinkDelete(linkToDelete: VideoLink) {
    this.videos = (this.videos || [])
      .filter((link) => {
        return !(link.provider === linkToDelete.provider
          && link.link === linkToDelete.link);
      });
    this.videosChange.emit(this.videos);
  }

  get linksExist() {
    return this.videos && this.videos.length;
  }

  get linkRequiredError() {
    const val = this.form.get('link');
    return val.invalid && (val.errors as any).required;
  }

  get videoEmbedFormatError() {
    if (this.linkRequiredError) {
      return false;
    }
    const val = this.form.get('link');
    return val.invalid && (val.errors as any).invalidVideoEmbedFormat;
  }

  constructor(
    private formBuilder: FormBuilder,
    private translationService: TranslationService
  ) {

  }
}
