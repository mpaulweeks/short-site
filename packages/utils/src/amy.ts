import fetch from 'node-fetch';
import html from 'node-html-parser';

const filmBaseUrls = [
  'vimeo.com',
  'youtube.com',
  'youtu.be',
  'filmfreeway.com',
];

const blackList = [
];

const isFilmAnchor = (aTag) => {
  return filmBaseUrls.some(baseUrl => (aTag.attributes.href || '').includes(baseUrl));
}

const isNotInBlacklist = (aTag) => {
  return !blackList.some(baseUrl => (aTag.attributes.href || '').includes(baseUrl));
}

const isLinkToFullFilm = (aTag) => {
  return aTag.innerHTML.includes('strong');
}

export const scrapeAmy = async () => {
  const resp = await fetch('https://amyjxu.me/bookmarks');
  const body = await resp.text();
  const root = html.parse(body) as html.HTMLElement;
  const anchorTags = root.querySelectorAll('a');
  const filmLinks = anchorTags
    .filter(isFilmAnchor)
    .filter(isNotInBlacklist)
    .filter(isLinkToFullFilm);
  const result = filmLinks.map(a => a.attributes.href);
  return result;
};
