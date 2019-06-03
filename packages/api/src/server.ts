import express, { Request, Response } from 'express';
import auth from "./auth";
import { getFavorites, setFavorite } from './repo';
import { newToken } from "./token";

const API_KEY = process.env.API_KEY || '';
const port = process.env.API_PORT || '5555';

const app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Token");
  next();
});
app.listen(port, () =>
  console.log(`Server is listening on port ${port}.`)
)

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

app.get('/ping', (req: Request, res: Response) => {
  res.send(JSON.stringify({
    message: 'hello world',
  }));
});

app.get('/whoami', (req: Request, res: Response) => {
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
});

app.post('/requestLogin', (req: Request, res: Response) => {
  // todo send email
  const email = req.body.email;
  const token = newToken(email);
  const encrypted = auth.encryptUserToken(API_KEY, token);
  res.send(JSON.stringify({
    token: encrypted,
  }));
});

app.post('/setFavorite', (req: Request, res: Response) => {
  const email = req.body.email;
  const video = req.body.video;
  const favorite = req.body.favorite;
  verifyUser(req, res, email);
  setFavorite(email, video, favorite).then(favoriteData => {
    res.send(JSON.stringify({
      favorites: favoriteData.user,
    }));
  });
});

app.post('/getFavorites', (req: Request, res: Response) => {
  const email = req.body.email;
  verifyUser(req, res, email);
  getFavorites(email).then(favoriteData => {
    res.send(JSON.stringify({
      favorites: favoriteData.user,
    }));
  });
});

app.get('/test', (req: Request, res: Response) => {
  const token = newToken('test@example.com');
  const encrypted = auth.encryptUserToken(API_KEY, token);
  res.send(JSON.stringify({
    cookie: encrypted,
  }));
});


export { app, };

