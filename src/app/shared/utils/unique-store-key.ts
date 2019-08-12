const usedKeysMap = {};
export function uniqueStoreKey(key: string) {
  if (usedKeysMap[key]) {
    throw new Error(`The store key ${key} is already used`);
  }
  usedKeysMap[key] = true;
  return key;
}
