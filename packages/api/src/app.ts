import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.json()); // support json encoded POST bodies
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes

app.get('/ping', (req, res) => {
  res.send(JSON.stringify({
    message: 'hello world',
  }));
});

export default app;
