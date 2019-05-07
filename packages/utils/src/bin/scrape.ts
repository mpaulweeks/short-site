import { scrapeAmy } from '../amy';
import { VimeoClient } from '../vimeo';

const sampleLinks = [
  // 'https://www.youtube.com/watch?v=VfKcLAwFJTo',
  // 'https://filmfreeway.com/ButJanewasdeaf',
  'https://vimeo.com/278337183',
  'https://vimeo.com/300566368',
  // 'https://vimeo.com/315400113',
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

export async function asyncMap<E, T>(
  array: E[],
  callback: (elm: E, index: number, array: E[]) => Promise<T>,
): Promise<T[]> {
  // https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
  const output: T[] = [];
  for (let index = 0; index < array.length; index++) {
    const result = await callback(array[index], index, array);
    output.push(result);
  }
  return output;
}

(async () => {
  console.log('scraper started');
  console.log(process.env.VIMEO_CLIENT_ID);
  // const urls = await scrapeAmy();
  const urls = sampleLinks;
  const vimeo = new VimeoClient();
  const allInfos = await asyncMap(urls, async url => {
    return (
      await vimeo.get(url) ||
      null
    );
  });
  const validInfos = allInfos.filter(i => i);
  console.log(validInfos);
  console.log('done!');
})();
