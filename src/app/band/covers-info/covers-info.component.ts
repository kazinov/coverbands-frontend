import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoverInfo } from './cover-info.model';

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
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    const cover: CoverInfo = this.form.value;
    this.covers.push(cover);
    this.addCover.emit(cover);
    this.form.reset();
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
    this.form = this.formBuilder.group({
      band: ['', [Validators.required]],
      song: ['', []]
    });
  }
}
