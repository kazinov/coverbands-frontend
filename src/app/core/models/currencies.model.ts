export const Currencies = {
  RussianRuble: 'russian-ruble'
}

export const ALL_CURRENCIES = Object.keys(Currencies)
  .map((key: string) => Currencies[key]);
