import { routes } from "./routes";

export function gcp(req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type, X-Token');
  res.set('Access-Control-Max-Age', '3600');

  if (req.method === 'OPTIONS') {
    // Send response to OPTIONS requests
    res.status(204).send('');
    return;
  }

  let served = false;
  routes.forEach(route => {
    const pathMatch = req.path.toUpperCase() === route.path.toUpperCase();
    const methodMatch = req.method.toUpperCase() === route.method.toUpperCase();
    if (pathMatch && methodMatch) {
      route.handler(req, res, () => { });
      served = true;
    }
  });
  if (!served) {
    res.status(404).send(`Not Found: ${req.method} ${req.path}`);
  }
};
