export interface BandLink {
  link: string,
  name: string
}

export interface BandContacts {
  email?: string;
  phone?: string;
  links?: BandLink[];
}