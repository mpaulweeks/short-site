const PROD_API = 'https://us-central1-shortstockpile.cloudfunctions.net/short-site-api';
const DEV_API = 'http://localhost:3001';

export class Api {
  base: string;

  constructor() {
    this.base = process.env.REACT_APP_IS_DEV ? DEV_API : PROD_API;
  }

  private async fetch(path: string) {
    const resp = await fetch(this.base + path);
    if (resp.ok) {
      return await resp.json();
    } else {
      throw 'Error fetching';
    }
  }

  async ping() {
    const res = await this.fetch('/ping');
    console.log(res);
  }
}
