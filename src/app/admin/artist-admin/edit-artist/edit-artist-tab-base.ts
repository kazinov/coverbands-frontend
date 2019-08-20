import { Artist } from '@core/artist/artist.model';
import { ARTIST_TYPE_TO_FIELD, EditableArtistField } from '@artist-admin/edit-artist/edit-artist/edit-artist.model';

export abstract class EditArtistTabBase {
  artist: Artist;
  EditableArtistField = EditableArtistField;

  get artistType() {
    return this.artist && this.artist.type;
  }

  isFieldVisible(field: EditableArtistField) {
    return ARTIST_TYPE_TO_FIELD[this.artistType][field];
  }

  isFieldRequired(field: EditableArtistField) {
    return ARTIST_TYPE_TO_FIELD[this.artistType][field]
      && ARTIST_TYPE_TO_FIELD[this.artistType][field].required;
  }
}
