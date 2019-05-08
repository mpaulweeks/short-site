import { Store } from 'short-site-utils';

(async () => {
  console.log('uploading api.zip');
  const store = new Store();
  await store.uploadToGCP('api.zip');
  console.log('uploaded zip');
})();
