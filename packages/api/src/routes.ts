import { Request, RequestHandler, Response } from "express";
import auth from "./auth";
import { newToken } from "./token";

const API_KEY = process.env.API_KEY || '';

interface Route {
  method: string;
  path: string;
  callback: RequestHandler;
};

function verifyUser(req, res, email) {
  const token = req.headers['x-token'];
  const actual = auth.decryptUserToken(API_KEY, token).email;
  if (actual !== email) {
    res.abort(403);
    throw 'unauthed user action';
  }
}

// routes
export const routes: Array<Route> = [
  {
    method: 'get',
    path: '/ping',
    callback: (req: Request, res: Response) => {
      res.send(JSON.stringify({
        message: 'hello world',
      }));
    },
  },
  {
    method: 'get',
    path: '/whoami',
    callback: (req: Request, res: Response) => {
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
    method: 'post',
    path: '/requestLogin',
    callback: (req: Request, res: Response) => {
      // todo send email
      const email = req.body.email;
      const token = newToken(email);
      const encrypted = auth.encryptUserToken(API_KEY, token);
      res.send(JSON.stringify({
        token: encrypted,
      }));
    },
  },
  {
    method: 'post',
    path: '/setFavorite',
    callback: (req: Request, res: Response) => {
      const email = req.body.email;
      const video = req.body.video;
      const favorite = req.body.favorite;
      verifyUser(req, res, email);
      setFavorite(email, video, favorite);
      res.send(JSON.stringify({
        token: encrypted,
      }));
    },
  },
  {
    method: 'get',
    path: '/test',
    callback: (req: Request, res: Response) => {
      const token = newToken('test@example.com');
      const encrypted = auth.encryptUserToken(API_KEY, token);
      res.send(JSON.stringify({
        cookie: encrypted,
      }));
    },
  },
];
