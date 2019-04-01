import fetch from 'node-fetch';
import html from 'node-html-parser';

const filmBaseUrls = [
  'vimeo.com',
  'youtube.com',
  'youtu.be',
  'filmfreeway.com',
];

const blackList = [
  'http://vimeo.com/amyjxu',
];

const isFilmAnchor = (aTag) => {
  const url = (aTag.attributes.href || '')
  return filmBaseUrls.some(baseUrl => url.includes(baseUrl)) &&
    !blackList.some(baseUrl => url.includes(baseUrl));
}

const isViableAnchor = (aTag) => {
  return aTag.innerHTML.includes('strong');
}

export const scrapeAmy = async () => {
  const resp = await fetch('https://amyjxu.me/bookmarks');
  const body = await resp.text();
  const root = html.parse(body);
  const anchorTags = root.querySelectorAll('a');
  const filmLinks = anchorTags
    .filter(isFilmAnchor)
    .filter(isViableAnchor);
  const result = filmLinks.map(a => a.attributes.href);
  return result;
};
