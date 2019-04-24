import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CitiesOfCountry } from './cities.model';
import { CitiesActionsUnion, loadCitiesSuccessAction } from './cities.actions';

export const citiesFeatureName = 'cities';

export interface CitiesModuleState {
  [citiesFeatureName]: EntityState<CitiesOfCountry>;
}

export const citiesAdapter = createEntityAdapter<CitiesOfCountry>();

const initialState: CitiesModuleState = {
  [citiesFeatureName]: citiesAdapter.getInitialState()
};

export function citiesReducer(state = initialState[citiesFeatureName],
                              action: CitiesActionsUnion):
  EntityState<CitiesOfCountry> {
  switch (action.type) {
    case loadCitiesSuccessAction.type:
      return citiesAdapter.addOne({
        id: action.countryId,
        cities: action.cities
      }, state);
    default: {
      return state;
    }
  }
}
