import { Cookies } from "react-cookie";

const PROD_API = 'https://us-central1-shortstockpile.cloudfunctions.net/short-site-api';
const DEV_API = 'http://localhost:3001';

export class Api {
  base: string;
  cookies: Cookies;

  constructor(cookies: Cookies) {
    this.base = process.env.REACT_APP_IS_DEV ? DEV_API : PROD_API;
    this.cookies = cookies;
  }

  private async fetch(path: string, options: any, body?: any) {
    const resp = await fetch(this.base + path, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Token': this.cookies.get('token'),
      },
      body: body ? JSON.stringify({
        ...body,
      }) : undefined,
    });
    if (resp.ok) {
      return await resp.json();
    } else {
      throw 'Error fetching';
    }
  }
  private async get(path: string) {
    return this.fetch(path, {
      method: 'GET',
    });
  }
  private async post(path: string, body: any) {
    return this.fetch(path, {
      method: 'POST',
    }, body);
  }

  async ping() {
    const res = await this.get('/ping');
    console.log(res);
  }
  async whoami() {
    return this.get('/whoami');
  }
  async requestLogin(email: string) {
    return this.post('/requestLogin', {
      email,
    });
  }
}
