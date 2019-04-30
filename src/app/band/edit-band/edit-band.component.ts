import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainBandInfo } from '../main-band-info.model';
import { CoverInfo } from '../../core/bands/bands.model';

@Component({
  selector: 'app-edit-band',
  templateUrl: './edit-band.component.html',
  styleUrls: ['./edit-band.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBandComponent implements OnInit {
  addBandForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): void {
    this.addBandForm = this.formBuilder.group({
      bandName: ['', [Validators.required]],
      song: ['', []]
    });
  }

  onMainInfoSave(info: MainBandInfo) {
    console.log('onMainInfoSave', info);
  }

  onAddCover(cover: CoverInfo) {
    console.log('onAddCover', cover);
  }
}
