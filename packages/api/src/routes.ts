import auth from "./auth";
import { newToken } from "./token";

const API_KEY = process.env.API_KEY || '';

interface Route {
  method: string;
  path: string;
  callback: (req: any, res: any) => void;
};

// routes
export const routes: Array<Route> = [
  {
    method: 'get',
    path: '/ping',
    callback: (req, res) => {
      res.send(JSON.stringify({
        message: 'hello world',
      }));
    },
  },
  {
    method: 'get',
    path: '/whoami',
    callback: (req, res) => {
      const token = req.headers['x-token'];
      let email: (string | null) = null;
      try {
        email = auth.decryptUserToken(API_KEY, token).email;
      } catch (e) {
        // do nothing
      }
      res.send(JSON.stringify({
        email,
      }));
    },
  },
  {
    method: 'get',
    path: '/test',
    callback: (req, res) => {
      const token = newToken('test@example.com');
      const encrypted = auth.encryptUserToken(API_KEY, token);
      res.send(JSON.stringify({
        cookie: encrypted,
      }));
    },
  },
];
