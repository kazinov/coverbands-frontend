import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CoverInfo } from '../../core/bands/bands.model';

@Component({
  selector: 'app-covers-info',
  templateUrl: './covers-info.component.html',
  styleUrls: ['./covers-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoversInfoComponent implements OnInit {
  @Input() covers: CoverInfo[] = [];
  @Output() addCover = new EventEmitter<CoverInfo>();
  @Output() removeCover = new EventEmitter<CoverInfo>();
  formGroup: FormGroup;
  // https://stackoverflow.com/questions/49788215/angular-material-reseting-reactiveform-shows-validation-error
  @ViewChild('form', { static: true }) form: FormGroupDirective;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    const cover: CoverInfo = this.formGroup.value;
    if (this.covers
      .some((value: CoverInfo) =>
        value.band === cover.band && value.song === cover.song)) {
      return;
    }

    this.covers.push(cover);
    this.addCover.emit(cover);
    this.formGroup.reset();
    this.form.resetForm();
  }

  onCoverRemoved(cover: CoverInfo) {
    const newCovers = [];
    this.covers.forEach((current: CoverInfo) => {
      if (cover.song !== current.song || cover.band !== cover.band) {
        newCovers.push(current);
      }
    });
    this.covers = newCovers;
    this.removeCover.emit(cover);
  }

  private buildForm(): void {
    this.formGroup = this.formBuilder.group({
      band: ['', [Validators.required]],
      song: ['', []]
    });
  }
}
