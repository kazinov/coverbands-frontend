export enum EditArtistTab {
  Main = 'main',
  Contacts = 'contacts',
  Links = 'links',
  Prices = 'prices',
  Covers = 'covers',
  Photo = 'photo',
  Video = 'video'
}

export enum EditableArtistField {
  Name = 0,
  Description,
  City,
  MusicGenres,
  DanceGenres,
  Covers,
  Links,
  Videos,
  ProfileImage,
  Images,
  Email,
  Phone,
  OneShowPrice,
  Prices
}

export interface EditableArtistFieldMeta {
  required: boolean;
}
