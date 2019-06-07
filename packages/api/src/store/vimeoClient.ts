import Vimeo from 'vimeo';

export class VimeoClient {
  client: Vimeo.Vimeo;

  constructor() {
    this.client = new Vimeo.Vimeo(
      process.env.VIMEO_CLIENT_ID,
      process.env.VIMEO_CLIENT_SECRET,
      process.env.VIMEO_ACCESS_TOKEN
    );
  }
  async get(url): Promise<any | null> {
    if (!url.includes('vimeo.com')) {
      return null;
    }
    const id = url.split('vimeo.com/')[1].split('/')[0].split('?')[0];
    return new Promise<any | null>((resolve, reject) => {
      try {
        this.client.request({
          path: `/videos/${id}`,
        }, (error, body, status_code, headers) => {
          if (error) {
            console.log('error during vimeo fetch:', url);
            // console.log(error);
            resolve(null);
          } else {
            resolve(body);
          }
        });
      } catch (error) {
        console.log('unexpected error during vimeo fetch:', url);
        // console.log(error);
        resolve(null);
      }
    });
  }
}
