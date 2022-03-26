const http = require('http');

const server = http.createServer((request, response) => {
  const url = request.url;

  switch (url) {
    case '/jose':
      response.write('Hola Mundo');
      break;
    case '/ana':
      response.write('Ola Mundo');
      break;
    case '/stefano':
      response.write('Ciao Mondo');
      break;
    default:
      response.write('Hello World');
  }

  response.end();
});

// 3000-3999, 5000-5999, 8000-8999
server.listen(3000);
