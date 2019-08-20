import { EditArtistTab } from '@artist-admin/edit-artist/edit-artist/edit-artist.model';
import { ArtistTypes } from '@core/models/artist-types.model';

export const ARTIST_TYPE_TO_TAB: {[type: string]: EditArtistTab[]} = {
  [ArtistTypes.LiveMusic]: [
    EditArtistTab.Main,
    EditArtistTab.Photo,
    EditArtistTab.Video,
    EditArtistTab.Prices,
    EditArtistTab.Contacts,
    EditArtistTab.Links,
    EditArtistTab.Covers,
  ],
  [ArtistTypes.DJ]: [
    EditArtistTab.Main,
    EditArtistTab.Photo,
    EditArtistTab.Video,
    EditArtistTab.Prices,
    EditArtistTab.Contacts,
    EditArtistTab.Links,
  ],
  [ArtistTypes.MC]: [
    EditArtistTab.Main,
    EditArtistTab.Photo,
    EditArtistTab.Video,
    EditArtistTab.Prices,
    EditArtistTab.Contacts,
    EditArtistTab.Links,
  ],
  [ArtistTypes.DanceShow]: [
    EditArtistTab.Main,
    EditArtistTab.Photo,
    EditArtistTab.Video,
    EditArtistTab.Prices,
    EditArtistTab.Contacts,
    EditArtistTab.Links,
  ],
  [ArtistTypes.StandUp]: [
    EditArtistTab.Main,
    EditArtistTab.Photo,
    EditArtistTab.Video,
    EditArtistTab.Prices,
    EditArtistTab.Contacts,
    EditArtistTab.Links,
  ],
  [ArtistTypes.Other]: [
    EditArtistTab.Main,
    EditArtistTab.Photo,
    EditArtistTab.Video,
    EditArtistTab.Prices,
    EditArtistTab.Contacts,
    EditArtistTab.Links,
  ],
};
