import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainBandInfo } from '../band.model';
import { select, Store } from '@ngrx/store';
import { MusicGenresModuleState } from '../../core/music-genres/music-genres.reducer';
import { loadMusicGenresAction } from '../../core/music-genres/music-genres.actions';
import { MusicGenresSelectors } from '../../core/music-genres/music-genres.selectors';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-main-band-info',
  templateUrl: './main-band-info.component.html',
  styleUrls: ['./main-band-info.component.scss']
})
export class MainBandInfoComponent implements OnInit {
  @Input() saveButtonText = 'Save';
  @Input() info: MainBandInfo;
  @Output() saveClick = new EventEmitter<MainBandInfo>();
  form: FormGroup;

  genres$ = this.store.pipe(select(this.musicGenresSelectors.selectGenres));

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<MusicGenresModuleState>,
    private musicGenresSelectors: MusicGenresSelectors
  ) {
  }

  ngOnInit() {
    this.store.dispatch(loadMusicGenresAction());
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      name: [this.info ? this.info.name : '', [Validators.required]],
      description: [this.info ? this.info.description : '', []],
      genres: [this.info ? this.info.genres : [], [Validators.required]]
    });
  }

  onSubmit() {
    this.saveClick.emit(this.form.value);
  }
}
