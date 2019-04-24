import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { citiesAdapter, citiesFeatureName } from './cities.reducer';
import { Dictionary, EntityState } from '@ngrx/entity';
import { CitiesOfCountry } from './cities.model';

const selectors = citiesAdapter.getSelectors();


@Injectable()
export class CitiesSelectors {
  selectData = createFeatureSelector<EntityState<CitiesOfCountry>>(citiesFeatureName);
  selectCitiesAll = createSelector(
    this.selectData,
    selectors.selectAll
  );
  selectCitiesEntities = createSelector(
    this.selectData,
    selectors.selectEntities
  );

  selectCitiesForCountry = createSelector(
    this.selectCitiesEntities,
    (
      cities: Dictionary<CitiesOfCountry>,
      props: { countryId }
    ) => cities[props.countryId]
  );
}
