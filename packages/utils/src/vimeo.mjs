import Vimeo from 'vimeo';

export class VimeoClient {
  constructor() {
    this.client = new Vimeo.Vimeo(
      process.env.VIMEO_CLIENT_ID,
      process.env.VIMEO_CLIENT_SECRET,
      process.env.VIMEO_ACCESS_TOKEN
    );
  }
  async get(url) {
    if (!url.includes('vimeo.com')){
      return null;
    }
    const id = url.split('vimeo.com/')[1].split('/')[0].split('?')[0];
    const resp = new Promise((resolve, reject) => {
      this.client.request({
        path: `/videos/${id}`,
      }, (error, body, status_code, headers) => {
        if (error) {
          resolve(error);
        } else {
          resolve(body);
        }
      });
    });
    return await resp;
  }
}
