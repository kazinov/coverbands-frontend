import { Injectable } from '@angular/core';

@Injectable()
export class StorageUrlCacheService {
  private projectImageUrlMap = new Map<string, string>();

  getUrl(key) {
    return this.projectImageUrlMap.get(key);
  }

  setUrl(key: string, value: string) {
    return this.projectImageUrlMap.set(key, value);
  }
}
