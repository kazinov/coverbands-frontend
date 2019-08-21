import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { parseEmbeddedVideoSrc } from '@shared/utils/parse-embedded-video-src';
import { videoEmbedFormatValidator } from '@artist-admin/edit-artist/edit-artist-videos/video-embed-format.validator';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditArtistVideoHelpDialogComponent } from '@artist-admin/edit-artist/edit-artist-videos/edit-artist-video-help-dialog/edit-artist-video-help-dialog.component';
import { TRANSLATIONS } from '@core/translation/translations';

const EMBED_FORM_KEY = 'embed';

@Component({
  selector: 'app-edit-artist-videos',
  templateUrl: './edit-artist-videos.component.html',
  styleUrls: ['./edit-artist-videos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistVideosComponent implements OnInit, OnDestroy {
  t = TRANSLATIONS;
  @Input() videos: string[];
  @Input() saveButtonText = this.t.editArtist.saveButton;
  @Output() saveVideos = new EventEmitter<string[]>();
  form: FormGroup;
  @ViewChild('formGroup', {static: true}) formGroup: FormGroupDirective;
  tableColumns: string[] = ['video', 'remove'];
  helpDialogRef: MatDialogRef<any>;

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.form = this.formBuilder.group({
      [EMBED_FORM_KEY]: ['', [videoEmbedFormatValidator, Validators.required]]
    });
  }

  onLinkSubmit() {
    const newVideo = parseEmbeddedVideoSrc(this.form.value.embed);
    if (!this.videos.some((video) => video === newVideo)) {
      this.videos = [
        ...(this.videos || []),
        parseEmbeddedVideoSrc(this.form.value.embed)
      ];
    }

    this.form.reset();
    this.formGroup.resetForm();
  }

  onLinkDelete(linkToDelete: string) {
    this.videos = (this.videos || [])
      .filter((link) => {
        return link.link !== linkToDelete.link;
      });
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

  onHelpClick() {
    this.helpDialogRef = this.dialog.open(EditArtistVideoHelpDialogComponent, {
      width: '600px',
    });
  }

  ngOnDestroy(): void {
    if (this.helpDialogRef) {
      this.helpDialogRef.close();
    }
  }

  onSaveButtonClick() {
    this.saveVideos.emit(this.videos);
  }

  get noVideos() {
    return !this.videos || !this.videos.length;
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {

  }
}
