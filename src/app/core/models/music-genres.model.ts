export const MusicGenres = {
  Rock: 'rock',
  Pop: 'pop',
  Rap: 'rap',
  Funk: 'funk',
  Jazz: 'jazz'
};

export const ALL_MUSIC_GENRES = Object.keys(MusicGenres)
  .map((key: string) => MusicGenres[key]);
