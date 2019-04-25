import { MusicGenres } from './music-genres.data';

export const allMusicGenres = Object.keys(MusicGenres)
  .map((key: string) => MusicGenres[key]);