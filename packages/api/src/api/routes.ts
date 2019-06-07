import { Request, RequestHandler, Response } from 'express';
import auth from "./auth";
import { getFavorites, setFavorite } from './repo';
import { newToken } from "./token";

const API_KEY = process.env.API_KEY || '';

function extractToken(req: Request): string | undefined {
  const token = req.headers['x-token'];
  return Array.isArray(token) ? token.pop() : token;
}

function verifyUser(req: Request, res: Response, email) {
  const token = extractToken(req);
  const actual = auth.decryptUserToken(API_KEY, token).email;
  if (actual !== email) {
    res.status(403).send({
      message: 'error during auth',
    });
    throw 'unauthed user action';
  }
}

// routes
export interface Route {
  method: string;
  path: string;
  handler: RequestHandler;
}

export const routes: Array<Route> = [
  {
    method: 'get',
    path: '/ping',
    handler: (req: Request, res: Response) => {
      res.send(JSON.stringify({
        message: 'hello world',
      }));
    },
  },
  {
    method: 'get',
    path: '/whoami',
    handler: (req: Request, res: Response) => {
      const token = extractToken(req);
      try {
        const email = auth.decryptUserToken(API_KEY, token).email;
        getFavorites(email).then(favoriteData => {
          res.send(JSON.stringify({
            email,
            favorites: favoriteData.user,
          }));
        });
      } catch (e) {
        // do nothing
        res.status(403).send({
          message: 'error during auth',
        });
      }
    },
  },
  {
    method: 'post',
    path: '/requestLogin',
    handler: (req: Request, res: Response) => {
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
    handler: (req: Request, res: Response) => {
      const email = req.body.email;
      const video = req.body.video;
      const favorite = req.body.favorite;
      verifyUser(req, res, email);
      setFavorite(email, video, favorite).then(favoriteData => {
        res.send(JSON.stringify({
          favorites: favoriteData.user,
        }));
      });
    },
  },
  {
    method: 'post',
    path: '/getFavorites',
    handler: (req: Request, res: Response) => {
      const email = req.body.email;
      verifyUser(req, res, email);
      getFavorites(email).then(favoriteData => {
        res.send(JSON.stringify({
          favorites: favoriteData.user,
        }));
      });
    },
  },
  {
    method: 'get',
    path: '/test',
    handler: (req: Request, res: Response) => {
      const token = newToken('test@example.com');
      const encrypted = auth.encryptUserToken(API_KEY, token);
      res.send(JSON.stringify({
        cookie: encrypted,
      }));
    },
  },
];
