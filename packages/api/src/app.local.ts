import express from 'express';
import { routes } from './routes';

const port = process.env.API_PORT;

const app = express();

app.use(express.json()); // todo mirror on gcloud

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-Token");
  next();
});

routes.forEach(r => {
  app[r.method.toLowerCase()](r.path, (req, res, next) => r.callback(req, res, next));
});

app.listen(port, () =>
  console.log(`Server is listening on port ${port}.`)
)
