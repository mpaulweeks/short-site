import fetch from 'node-fetch';

const testToken = 'VTJGc2RHVmtYMTlhWjNuQldxZk9PbEpOeGVaZDlra3BqalM4cUFmSE03RXhpMCtRZHRYbkhxWmh6OUxySk9HVw==';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Token': testToken,
};

(async () => {
  let resp, data;

  resp = await fetch('http://localhost:5555/whoami', {
    method: 'GET',
    headers,
  });
  data = await resp.json();
  console.log(data);

  resp = await fetch('http://localhost:5555/getFavorites', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email: 'test@example.com',
    }),
  });
  data = await resp.json();
  console.log(data);
})();
