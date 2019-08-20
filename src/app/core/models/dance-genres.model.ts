export const DanceGenres = {
  HipHop: 'hip-hop',
  Russian: 'russian',
  Ballroom: 'ballroom'
};

export const ALL_DANCE_GENRES = Object.keys(DanceGenres)
  .map((key: string) => DanceGenres[key]);
