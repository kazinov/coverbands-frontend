import { MainBandInfo } from '../../band/main-band-info.model';
import { BandContacts } from '../../band/band-contacts/band-contacts.model';
import { BandPrices } from '../../band/band-prices/band-prices.model';

export interface CoverInfo {
  band: string,
  song: string
}

export interface BandLink {
  link: string,
  description: string
}

export interface Band
  extends MainBandInfo, BandContacts, BandPrices {
  id: string;
  covers?: CoverInfo[];
  links?: BandLink[];
}