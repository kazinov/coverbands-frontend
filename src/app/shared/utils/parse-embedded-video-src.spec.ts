import { parseEmbeddedVideoSrc } from './parse-embedded-video-src';

describe('parseVideoUrl', () => {
  it('should parse youtube url', () => {
    const input = '<iframe width="560" height="315" src="https://www.youtube.com/embed/FqcPgHwL3kQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    const expected = 'https://www.youtube.com/embed/FqcPgHwL3kQ';
    expect(parseEmbeddedVideoSrc(input)).toBe(expected);
  });

  it('should parse vk url', () => {
    const input = '<iframe src="//vk.com/video_ext.php?oid=-72725457&id=456242518&hash=bd988a22dfa2c498&hd=2" width="853" height="480" frameborder="0" allowfullscreen></iframe>'
    const expected = '//vk.com/video_ext.php?oid=-72725457&id=456242518&hash=bd988a22dfa2c498&hd=2';
    expect(parseEmbeddedVideoSrc(input)).toBe(expected);
  });

  it('should parse vimeo url', () => {
    const input = `<iframe src="https://player.vimeo.com/video/28635013" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
<p><a href="https://vimeo.com/28635013">cay sofa alexander rehn</a> from <a href="https://vimeo.com/alexanderrehn">Alexander Rehn</a> on <a href="https://vimeo.com">Vimeo</a>.</p>`
    const expected = 'https://player.vimeo.com/video/28635013';
    expect(parseEmbeddedVideoSrc(input)).toBe(expected);
  });
});
