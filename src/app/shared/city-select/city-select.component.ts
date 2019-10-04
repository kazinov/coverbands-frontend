import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ALL_RUSSIAN_CITIES } from '@core/models/cities.model';
import { Countries } from '@core/models/countries.model';
import { TRANSLATIONS } from '@core/translation/translations';
import { ValueAccessorBase } from '@shared/form/value-accessor';
import { SelectorOption } from '@shared/utils/selector-option';

@Component({
  selector: 'app-city-select',
  templateUrl: './city-select.component.html',
  styleUrls: ['./city-select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CitySelectComponent,
    multi: true,
  }]
})
export class CitySelectComponent extends ValueAccessorBase<Array<any>> implements OnInit, OnDestroy {
  @Input() label: string;

  cities: SelectorOption[]
    = ALL_RUSSIAN_CITIES.map((cityId) => ({
    id: cityId,
    label: TRANSLATIONS.cities[Countries.Russia][cityId]
  }));
  filteredCities: SelectorOption[] = this.cities.slice();

  cityFilter: string;

  ngOnInit() {
  }

  onCityFilterChange(search: string) {
    if (!search) {
      this.filteredCities = this.cities.slice();
    } else {
      search = search.toLowerCase();
      this.filteredCities
        = this.cities
        .filter(city => city.label.toLowerCase().indexOf(search) > -1);
    }
  }

  constructor(changeDetectorRef: ChangeDetectorRef) {
    super(changeDetectorRef);
  }

  ngOnDestroy(): void {
  }
}
