import { Store } from '../store';

(async () => {
  console.log('uploading api.zip');
  const store = new Store();
  await store.uploadFileToGCP('api.zip');
  console.log('uploaded zip');
})();
