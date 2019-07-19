import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { parseEmbeddedVideoSrc } from '@shared/utils/parse-embedded-video-src';
import { videoEmbedFormatValidator } from '@artist-admin/edit-artist/edit-artist-videos/video-embed-format.validator';

const EMBED_FORM_KEY = 'embed';

@Component({
  selector: 'app-edit-artist-videos',
  templateUrl: './edit-artist-videos.component.html',
  styleUrls: ['./edit-artist-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistVideosComponent implements OnInit {
  @Input() videos: string[];
  @Output() videosChange = new EventEmitter<string[]>();
  form: FormGroup;
  @ViewChild('formGroup', {static: true}) formGroup: FormGroupDirective;
  tableColumns: string[] = ['video', 'remove'];

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.form = this.formBuilder.group({
      [EMBED_FORM_KEY]: ['', [videoEmbedFormatValidator, Validators.required]]
    });
  }

  onLinkSubmit() {
    this.videos = [
      ...(this.videos || []),
      parseEmbeddedVideoSrc(this.form.value.embed)
    ];

    this.videosChange.emit(this.videos);
    this.form.reset();
    this.formGroup.resetForm();
  }

  onLinkDelete(linkToDelete: string) {
    this.videos = (this.videos || [])
      .filter((link) => {
        return link.link !== linkToDelete.link;
      });
    this.videosChange.emit(this.videos);
  }

  get linksExist() {
    return this.videos && this.videos.length;
  }

  get linkRequiredError() {
    const val = this.form.get(EMBED_FORM_KEY);
    return val.invalid && (val.errors as any).required;
  }

  get videoEmbedFormatError() {
    if (this.linkRequiredError) {
      return false;
    }
    const val = this.form.get(EMBED_FORM_KEY);
    return val.invalid && (val.errors as any).invalidVideoEmbedFormat;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}