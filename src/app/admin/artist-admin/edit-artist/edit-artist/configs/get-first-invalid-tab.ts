import { Artist } from '@core/artist/artist.model';
import { EditableArtistField, EditArtistTab } from '@artist-admin/edit-artist/edit-artist/edit-artist.model';
import { ARTIST_TYPE_TO_FIELD_META } from '@artist-admin/edit-artist/edit-artist/configs/artist-type-to-field-meta';

export function getFirstInvalidTab(artist: Artist): EditArtistTab {
  if (!artist || !artist.name || !artist.city || !artist.type) {
    return EditArtistTab.Main;
  }

  const musicGenresConfig = ARTIST_TYPE_TO_FIELD_META[artist.type][EditableArtistField.MusicGenres];
  const musicGenresRequired = musicGenresConfig && musicGenresConfig.required;
  if (musicGenresRequired && (!artist.musicGenres || !artist.musicGenres.length)) {
    return EditArtistTab.Main;
  }

  const danceGenresConfig = ARTIST_TYPE_TO_FIELD_META[artist.type][EditableArtistField.DanceGenres]
  const danceGenresRequired = danceGenresConfig && danceGenresConfig.required;
  if (danceGenresRequired && (!artist.danceGenres || !artist.danceGenres.length)) {
    return EditArtistTab.Main;
  }

  if (!artist.email && !artist.phoneNumber) {
    return EditArtistTab.Contacts;
  }

  if (!artist.oneShowPrice) {
    return EditArtistTab.Prices;
  }

  if (!artist.profileImage || !artist.profileImageThumb) {
    return EditArtistTab.Photo;
  }

  if (!artist.videos || !artist.videos.length) {
    return EditArtistTab.Video;
  }
}
