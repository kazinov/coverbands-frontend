export abstract class TranslationUtils {
  static interpolate(input: string, map: { [index: string]: string | number }) {
    return Object.keys(map)
      .reduce((memo, key) => {
        return memo.replace(new RegExp(`{${key}}`, 'g'), map[key] + '');
      }, input);
  }
}
