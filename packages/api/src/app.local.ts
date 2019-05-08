import bodyParser from 'body-parser';
import express from 'express';
import { routes } from './routes';
const port = process.env.API_PORT;

const app = express();
app.use(bodyParser.json()); // support json encoded POST bodies
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes.forEach(r => {
  app[r.method.toLowerCase()](r.path, (req, res) => r.callback(req, res));
});

app.listen(port, () =>
  console.log(`Server is listening on port ${port}.`)
)
