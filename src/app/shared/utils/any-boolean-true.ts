import identity from 'lodash-es/identity';

export function anyBooleanTrue(observs: boolean[]): boolean {
  return !!(observs && observs.some(identity));
}
