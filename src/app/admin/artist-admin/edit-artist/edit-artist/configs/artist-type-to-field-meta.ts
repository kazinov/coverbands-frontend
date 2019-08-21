import { ArtistTypes } from '@core/models/artist-types.model';
import { EditableArtistField, EditableArtistFieldMeta } from '@artist-admin/edit-artist/edit-artist/edit-artist.model';

export const ARTIST_TYPE_TO_FIELD_META: {[type: string]: {[field: string]: EditableArtistFieldMeta}} = {
  [ArtistTypes.LiveMusic]: {
    [EditableArtistField.MusicGenres]: {required: true},
    [EditableArtistField.DanceGenres]: null,
    [EditableArtistField.Covers]: {required: false},
  },
  [ArtistTypes.DJ]: {
    [EditableArtistField.MusicGenres]: {required: true},
    [EditableArtistField.DanceGenres]: null,
    [EditableArtistField.Covers]: null,
  },
  [ArtistTypes.MC]: {
    [EditableArtistField.MusicGenres]: null,
    [EditableArtistField.DanceGenres]: null,
    [EditableArtistField.Covers]: null,
  },
  [ArtistTypes.DanceShow]: {
    [EditableArtistField.MusicGenres]: null,
    [EditableArtistField.DanceGenres]: {required: true},
    [EditableArtistField.Covers]: null,
  },
  [ArtistTypes.StandUp]: {
    [EditableArtistField.MusicGenres]: null,
    [EditableArtistField.DanceGenres]: null,
    [EditableArtistField.Covers]: null,
  },
  [ArtistTypes.Other]: {
    [EditableArtistField.MusicGenres]: null,
    [EditableArtistField.DanceGenres]: null,
    [EditableArtistField.Covers]: null,
  },
}
