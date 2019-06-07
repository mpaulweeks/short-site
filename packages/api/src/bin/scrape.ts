import uuidv4 from 'uuid/v4';
import { scrapeAmy, Store, VimeoClient } from '../store';
import { asyncMap, notEmpty, Video } from '../utils';

function newId(): string {
  return uuidv4();
}

const sampleLinks = [
  // 'https://www.youtube.com/watch?v=VfKcLAwFJTo',
  // 'https://filmfreeway.com/ButJanewasdeaf',
  'https://vimeo.com/278337183',
  'https://vimeo.com/300566368',
  'https://vimeo.com/315400113',
  // 'https://vimeo.com/300366754',
  // 'https://vimeo.com/262427935',
  // 'https://vimeo.com/286358150',
  // 'https://vimeo.com/304241937',
  // 'https://vimeo.com/247324656',
  // 'https://vimeo.com/289581182',
  // 'https://vimeo.com/user1172748',
  // 'https://vimeo.com/270652095',
  // 'https://vimeo.com/132138471',
  // 'https://vimeo.com/217759099',
  // 'https://vimeo.com/171849543',
  // 'https://vimeo.com/273542798',
  // 'https://vimeo.com/284610483',
  // 'https://vimeo.com/257761642',
  // 'https://vimeo.com/232858386',
  // 'https://vimeo.com/167086547',
  // 'https://vimeo.com/266044738',
  // 'https://vimeo.com/149335431',
  // 'https://vimeo.com/245474330',
  // 'https://vimeo.com/244349942',
  // 'https://vimeo.com/268096566',
  // 'https://www.youtube.com/watch?v=-4wNarwlMh4',
  // 'https://vimeo.com/220834228',
  // 'https://vimeo.com/244847155',
  // 'https://vimeo.com/193800027',
  // 'https://vimeo.com/224651200',
  // 'https://vimeo.com/215498188',
];

(async () => {
  console.log('scraper started');

  const store = new Store();
  const db = await store.downloadDB();
  // const db = Database.makeEmpty();

  const urls = await scrapeAmy();
  // const urls = sampleLinks;
  console.log('total urls found:', urls.length);

  const newUrls = urls.filter(u => !db.contains(u));
  console.log('new urls found:', newUrls.length);

  const vimeo = new VimeoClient();
  const allInfos = await asyncMap(newUrls, async url => ({
    url: url,
    info: (
      await vimeo.get(url) ||
      null
    ),
  }));

  const validInfos = allInfos.filter(notEmpty);
  console.log('video data fetched:', validInfos.length);

  const videos = validInfos.map(i => Video.fromVimeo(newId(), i.url, i.info)).filter(notEmpty);
  console.log('video data parsed:', videos.length);

  console.log('videos before:', db.getVideos().length);
  videos.forEach(v => db.addVideo(v));
  console.log('videos after:', db.getVideos().length);

  await store.updateLocalDB(db);
  await store.uploadDatabaseToGCP(db);
  console.log('uploaded db');
})();
