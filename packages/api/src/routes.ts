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
];
