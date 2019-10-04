import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ALL_ARTIST_TYPES } from '@core/models/artist-types.model';
import { ALL_RUSSIAN_CITIES } from '@core/models/cities.model';
import { Countries } from '@core/models/countries.model';
import { TRANSLATIONS } from '@core/translation/translations';
import { ValueAccessorBase } from '@shared/form/value-accessor';
import { SelectorOption } from '@shared/utils/selector-option';

@Component({
  selector: 'app-artist-type-select',
  templateUrl: './artist-type-select.component.html',
  styleUrls: ['./artist-type-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: ArtistTypeSelectComponent,
    multi: true,
  }]
})
export class ArtistTypeSelectComponent extends ValueAccessorBase<Array<any>> implements OnInit, OnDestroy {
  @Input() label: string;

  artistTypes: SelectorOption[]
    = ALL_ARTIST_TYPES.map((typeId) => ({
    id: typeId,
    label: TRANSLATIONS.artistTypes[typeId]
  }));

  ngOnInit() {
  }

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  ngOnDestroy(): void {
  }
}
