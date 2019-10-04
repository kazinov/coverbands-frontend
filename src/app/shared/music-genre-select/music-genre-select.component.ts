import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ALL_MUSIC_GENRES } from '@core/models/music-genres.model';
import { TRANSLATIONS } from '@core/translation/translations';
import { ValueAccessorBase } from '@shared/form/value-accessor';
import { SelectorOption } from '@shared/utils/selector-option';

@Component({
  selector: 'app-music-genre-select',
  templateUrl: './music-genre-select.component.html',
  styleUrls: ['./music-genre-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: MusicGenreSelectComponent,
    multi: true,
  }]
})
export class MusicGenreSelectComponent extends ValueAccessorBase<Array<any>> implements OnInit, OnDestroy {
  @Input() label: string;

  musicGenres: SelectorOption[]
    = ALL_MUSIC_GENRES.map((genreId) => ({
    id: genreId,
    label: TRANSLATIONS.musicGenres[genreId]
  }));

  ngOnInit() {
  }

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  ngOnDestroy(): void {
  }
}
