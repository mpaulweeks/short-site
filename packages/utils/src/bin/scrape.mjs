import { scrapeAmy } from '../amy';

(async () => {
  const res = await scrapeAmy();
  console.log(res);
  console.log('done!');
})();
