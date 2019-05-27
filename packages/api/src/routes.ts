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
