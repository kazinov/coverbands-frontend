export function parseEmbeddedVideoSrc(html: string) {
  if (!html) {
    return null;
  }
  const srcSearch = 'src="';
  const indexOfSrc = html.indexOf(srcSearch);
  if (indexOfSrc < 0) {
    return null;
  }

  html = html.substring(indexOfSrc + srcSearch.length);

  const indexOfQuotes = html.indexOf('"');
  return html.substring(0, indexOfQuotes);
}
