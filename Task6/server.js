const http = require('http');

function jsonFunc(res, statusCode, body) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json;',
  });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === '/' && method == 'GET') return jsonFunc(res, 200,  { message: "Welcome to the server" });
  if (url === '/about'&& method == 'GET') return jsonFunc(res, 200, { message: 'This is the about route' });

  return jsonFunc(res, 404, { error: 'Route not found' });
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:${3000}`);
});
