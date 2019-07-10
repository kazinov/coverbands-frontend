import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { VideoLink } from '@core/artist/artist.model';

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

  ngOnInit() {
    this.buildForms();
  }

  private buildForms(): void {
    this.form = this.formBuilder.group({
      link: ['', [Validators.required]]
    });
  }

  onLinkSubmit() {
    this.videos = [
      ...(this.videos || []),
      this.form.value
    ];

    this.videosChange.emit(this.videos);
    this.form.reset();
    this.formGroup.resetForm();
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

  constructor(
    private formBuilder: FormBuilder
  ) {

  }
}
