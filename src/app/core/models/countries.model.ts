export const Countries = {
  Russia: 'russia'
};

export const ALL_COUNTRIES = Object.keys(Countries)
  .map((key: string) => Countries[key]);
