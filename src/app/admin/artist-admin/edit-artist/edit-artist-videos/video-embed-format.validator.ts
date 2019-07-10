import { FormControl } from '@angular/forms';
import { parseEmbeddedVideoSrc } from '@shared/utils/parse-embedded-video-src';

export function videoEmbedFormatValidator(control: FormControl) {
  if (!!parseEmbeddedVideoSrc(control.value)) {
    return null;
  } else {
    return {invalidVideoEmbedFormat: true};
  }
}
