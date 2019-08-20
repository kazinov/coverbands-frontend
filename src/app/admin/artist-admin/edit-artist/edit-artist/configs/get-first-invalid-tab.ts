import { Artist } from '@core/artist/artist.model';
import { EditableArtistField, EditArtistTab } from '@artist-admin/edit-artist/edit-artist/edit-artist.model';
import { ARTIST_TYPE_TO_FIELD_META } from '@artist-admin/edit-artist/edit-artist/configs/artist-type-to-field-meta';

export function getFirstInvalidTab(artist: Artist): EditArtistTab {
  if (!artist || !artist.name || !artist.city || !artist.type) {
    return EditArtistTab.Main;
  }

  const musicGenresRequired = ARTIST_TYPE_TO_FIELD_META[artist.type][EditableArtistField.MusicGenres].required;
  if (musicGenresRequired && (!artist.musicGenres || !artist.musicGenres.length)) {
    return EditArtistTab.Main;
  }

  const danceGenresRequired = ARTIST_TYPE_TO_FIELD_META[artist.type][EditableArtistField.DanceGenres].required;
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
