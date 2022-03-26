const express = require('express');

const app = express();

// I'm telling express to look inside the public directory
// for files that match the requested path
// if the requested path is '/style.css' and such a file exists
// inside of the 'public' directory, it will be served
app.use(express.static('public'));

// Setting a request handling function for
// any request made to path '/' with the GET method
app.get('/', (request, response) => {
  response.send('Hello World');
});

// We can just send inline HTML
app.get('/jose', (request, response) => {
  response.send('<h1 style="color: red;">Hola Mundo</h1>');
});

// With sendFile we can respond with the contents of an HTML file
// We need to give sendFile the absolute path for the file
// The globally available variable __dirname always holds
// the absolute path for the directory that contains the
// JS file it is used on
app.get('/ana', (request, response) => {
  response.sendFile(__dirname + '/views/ana.html');
});

// This does not scale
// app.get('/style.css', (request, response) => {
//   response.sendFile(__dirname + '/style.css');
// });

// '*' matches any path
app.get('*', (request, response) => {
  response.send('Hallo Welt');
});

app.listen(3000);
