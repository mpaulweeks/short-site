import fetch from 'node-fetch';
import * as parser from 'node-html-parser';

const filmBaseUrls = [
  'vimeo.com',
  'youtube.com',
  'youtu.be',
  'filmfreeway.com',
];

const blackList = [
];

function isFilmAnchor(aTag: parser.HTMLElement) {
  return filmBaseUrls.some(baseUrl => (aTag.attributes.href || '').includes(baseUrl));
}

function isNotInBlacklist(aTag: parser.HTMLElement) {
  return !blackList.some(baseUrl => (aTag.attributes.href || '').includes(baseUrl));
}

function isLinkToFullFilm(aTag: parser.HTMLElement) {
  return aTag.innerHTML.includes('strong');
}

export async function scrapeAmy(): Promise<Array<string>> {
  const resp = await fetch('https://amyjxu.me/bookmarks');
  const body = await resp.text();
  const root = parser.parse(body) as parser.HTMLElement;
  const anchorTags = root.querySelectorAll('a');
  const filmLinks = anchorTags
    .filter(isFilmAnchor)
    .filter(isNotInBlacklist)
    .filter(isLinkToFullFilm);
  const urls = filmLinks.map(a => a.attributes.href);
  return urls;
};
