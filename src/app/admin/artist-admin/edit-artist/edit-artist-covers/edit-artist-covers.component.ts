import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CoverInfo } from '@core/artist/artist.model';
import { TRANSLATIONS } from '@core/translation/translations';

@Component({
  selector: 'app-edit-artist-covers',
  templateUrl: './edit-artist-covers.component.html',
  styleUrls: ['./edit-artist-covers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditArtistCoversComponent implements OnInit {
  t = TRANSLATIONS;
  @Input() showNextButton = false;
  @Input() covers: CoverInfo[] = [];
  @Output() coversChange = new EventEmitter<CoverInfo[]>();
  @Output() nextButtonClick = new EventEmitter();
  formGroup: FormGroup;
  // https://stackoverflow.com/questions/49788215/angular-material-reseting-reactiveform-shows-validation-error
  @ViewChild('form', {static: true}) form: FormGroupDirective;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.covers = [...this.covers] || [];
    const cover: CoverInfo = this.formGroup.value;
    if (this.covers.some((value: CoverInfo) =>
      value.band === cover.band && value.song === cover.song)) {
      return;
    }

    this.covers.push(cover);
    this.coversChange.emit(this.covers);
    this.formGroup.reset();
    this.form.resetForm();
  }

  onCoverRemoved(cover: CoverInfo) {
    const newCovers = [];
    this.covers = [...this.covers] || [];
    this.covers.forEach((current: CoverInfo) => {
      if (cover.song !== current.song || cover.band !== cover.band) {
        newCovers.push(current);
      }
    });
    this.covers = newCovers;
    this.coversChange.emit(this.covers);
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      band: ['', [Validators.required]],
      song: ['', []]
    });
  }
}
