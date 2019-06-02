import { routes } from "./routes";

export function gcp(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');

  let served = false;
  routes.forEach(route => {
    if (req.path === route.path && req.method === route.method.toUpperCase()) {
      route.callback(req, res, () => { });
      served = true;
    }
  });

  if (!served) {
    res.status(404).send('Not Found');
  }
};
