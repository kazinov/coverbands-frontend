import { loadMusicGenresSuccessAction, MusicGenresActionsUnion } from './music-genres.actions';

export const musicGenresFeatureName = 'musicGenres';

export interface MusicGenresModuleState {
  [musicGenresFeatureName]: string[];
}

const initialState: MusicGenresModuleState = {
  [musicGenresFeatureName]: []
};

export function musicGenresReducer(state = initialState[musicGenresFeatureName],
                                   action: MusicGenresActionsUnion):
  string[] {
  switch (action.type) {
    case loadMusicGenresSuccessAction.type:
      return action.genres;
    default: {
      return state;
    }
  }
}
