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
  Name = 'name',
  Description = 'description',
  City = 'city',
  MusicGenres = 'music-genres',
  DanceGenres = 'dance-genres',
  Covers = 'covers',
  Links = 'links',
  Videos = 'videos',
  ProfileImage = 'profile-image',
  Images = 'images',
  Email = 'email',
  Phone = 'phone',
  OneShowPrice = 'one-show-price',
  Prices = 'prices',
}

export interface EditableArtistFieldMeta {
  required: boolean;
}
