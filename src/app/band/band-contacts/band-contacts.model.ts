export interface BandLink {
  link: string,
  name: string
}

export interface BandContacts {
  email?: string;
  phoneCode?: string
  phoneNumber?: string;
  links?: BandLink[];
}