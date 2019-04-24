import { props, union, createAction } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const loadMusicGenresAction = createAction('[Music genres] load');
export const loadMusicGenresSuccessAction = createAction('[Music genres] load success',
  props<{ genres: string[] }>());
export const loadMusicGenresFailureAction = createAction('[Music genres] load failure',
  props<{ error: HttpErrorResponse }>());

const all = union({loadMusicGenresAction, loadMusicGenresSuccessAction, loadMusicGenresFailureAction});
export type MusicGenresActionsUnion = typeof all;