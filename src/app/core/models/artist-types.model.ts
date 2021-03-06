export const ArtistTypes = {
  LiveMusic: 'live-music',
  DJ: 'dj',
  MC: 'mc',
  DanceShow: 'dance-show',
  StandUp: 'stand-up',
  Other: 'other'
};

export const ALL_ARTIST_TYPES = Object.keys(ArtistTypes)
  .map((key: string) => ArtistTypes[key]);
