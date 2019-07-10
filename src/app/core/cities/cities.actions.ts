import { props, union, createAction } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Countries } from '@core/models/counries.model';

export const loadCitiesAction = createAction('[Cities] load',
  props<{ countryId: Countries }>());
export const loadCitiesSuccessAction = createAction('[Cities] load success',
  props<{ countryId: Countries, cities: string[] }>());
export const loadCitiesFailureAction = createAction('[Cities] load failure',
  props<{ error: HttpErrorResponse }>());

const all = union({loadCitiesAction, loadCitiesSuccessAction, loadCitiesFailureAction});
export type CitiesActionsUnion = typeof all;
