import { MainBandInfo } from '../../band/main-band-info.model';
import { BandContacts } from '../../band/band-contacts/band-contacts.model';

export interface CoverInfo {
  band: string,
  song: string
}

export interface Band extends MainBandInfo, BandContacts {
  id: string;
  covers?: CoverInfo[];
}