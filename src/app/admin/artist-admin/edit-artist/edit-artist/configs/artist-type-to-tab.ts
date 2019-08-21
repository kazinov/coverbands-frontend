import { EditArtistTab } from '@artist-admin/edit-artist/edit-artist/edit-artist.model';
import { ArtistTypes } from '@core/models/artist-types.model';
import { ALL_ONBOARDING_STEPS } from '@artist-admin/edit-artist/edit-artist/configs/all-onboarding-steps';

const ONBOARDING_STEPS_WITHOUT_COVERS = ALL_ONBOARDING_STEPS
  .filter((step) => step !== EditArtistTab.Covers);

export const ARTIST_TYPE_TO_TAB: {[type: string]: EditArtistTab[]} = {
  [ArtistTypes.LiveMusic]: ALL_ONBOARDING_STEPS,
  [ArtistTypes.DJ]: ONBOARDING_STEPS_WITHOUT_COVERS,
  [ArtistTypes.MC]: ONBOARDING_STEPS_WITHOUT_COVERS,
  [ArtistTypes.DanceShow]: ONBOARDING_STEPS_WITHOUT_COVERS,
  [ArtistTypes.StandUp]: ONBOARDING_STEPS_WITHOUT_COVERS,
  [ArtistTypes.Other]: ONBOARDING_STEPS_WITHOUT_COVERS
};
