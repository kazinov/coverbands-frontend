export interface CoverInfo {
  band: string,
  song: string
}

export interface Band {
  id: string;
  name: string;
  description?: string;
  city: string;
  genres: string[];
  covers?: CoverInfo[];
}