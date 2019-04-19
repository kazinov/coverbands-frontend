import { props, union, createAction } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const loadMusicGenresAction = createAction('[Music genres] Login');
export const loadMusicGenresSuccessAction = createAction('[Music genres] Login success',
  props<{ genres: string[] }>());
export const loadMusicGenresFailureAction = createAction('[Music genres] Login failure',
  props<{ error: HttpErrorResponse }>());

const all = union({loadMusicGenresAction, loadMusicGenresSuccessAction, loadMusicGenresFailureAction});
export type MusicGenresActionsUnion = typeof all;