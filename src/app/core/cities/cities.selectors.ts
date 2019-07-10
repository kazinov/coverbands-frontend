import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { citiesAdapter, citiesFeatureName } from './cities.reducer';
import { Dictionary, EntityState } from '@ngrx/entity';
import { CitiesOfCountry } from './cities.model';
import { Countries } from '../countries/counries.model';

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

  areCitiesLoadedForCountry = createSelector(
    this.selectCitiesEntities,
    (
      cities: Dictionary<CitiesOfCountry>,
      props: { countryId }
    ) => cities[props.countryId]
  );

  citiesForCountrySelectorFactory = (countryId: Countries) => {
    return createSelector(
      this.selectCitiesEntities,
      (cities: Dictionary<CitiesOfCountry>) => cities[countryId] && cities[countryId].cities
    );
  }

  areCitiesLoadedForCountrySelectorFactory = (countryId: Countries) => {
    return createSelector(
      this.citiesForCountrySelectorFactory(countryId),
      (cities: string[]) => cities && !!cities.length
    );
  }
}
