export const Cities = {
  SaintPetersburg: 'saint-petersburg',
  Moscow: 'moscow',
  Kazan: 'kazan',
  Krasnodar: 'krasnodar',
  Yaroslavl: 'yaroslavl'
};

export const ALL_CITIES = Object.keys(Cities)
  .map((key: string) => Cities[key]);
