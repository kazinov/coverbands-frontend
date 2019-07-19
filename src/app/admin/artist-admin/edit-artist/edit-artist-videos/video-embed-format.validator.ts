import { FormControl } from '@angular/forms';
import { parseEmbeddedVideoSrc } from '@shared/utils/parse-embedded-video-src';

const ALLOWED_SOURCES: RegExp[] = [
  /^https:\/\/www\.youtube\.com\/embed\/+./i,
  /^\/\/vk\.com\/video_ext\.php+./i,
  /^\/\/rutube\.ru\/play\/embed\/+./i,
  /^https:\/\/player\.vimeo\.com\/video\/+./i,
  /^https:\/\/www\.facebook\.com\/plugins\/video\.php+./i,
  /^\/\/ok\.ru\/videoembed\/+./i
];

export function videoEmbedFormatValidator(control: FormControl) {
  const url = parseEmbeddedVideoSrc(control.value)
  if (!!url
    && ALLOWED_SOURCES.some((source: RegExp) => source.test(url))) {
    return null;
  } else {
    return {invalidVideoEmbedFormat: true};
  }
}
