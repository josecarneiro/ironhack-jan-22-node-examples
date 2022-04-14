const express = require('express');
const serveFavicon = require('serve-favicon');
const morgan = require('morgan');
const nodeSassMiddleware = require('node-sass-middleware');
const baseRouter = require('./routes/base');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(serveFavicon(__dirname + '/public/favicon.ico'));

// Middleware is a function that gets executed for every request
// not meant to issue a response
app.use(morgan('dev'));

app.use(
  nodeSassMiddleware({
    src: __dirname + '/public',
    dest: __dirname + '/public',
    outputStyle: 'nested',
    force: true
  })
);

app.use(express.static(__dirname + '/public'));

// Tell express to use body parse, parse raw body into req.body object
app.use(express.urlencoded({ extended: false }));

// Mounting router on application
// Route handlers were mounted on router instead of being mounted
// on application
app.use(baseRouter);
// app.use('/', baseRouter);

// Any get request that isn't matched by any of the route handlers above
// will be matched by this one. The next function gets called,
// an error is passed and as a result the error page gets rendered
app.get('*', (req, res, next) => {
  next(new Error('NOT_FOUND'));
});

// 200 - Ok (default code for any response from express app)
// 200-299 - Successful request

// 300-399 - Redirection

// 400 - Bad request
// 401 - Not Authorized
// 403 - Forbidden
// 404 - Page not found
// 400-499 - User-caused errors

// 500 - Internal server error
// 500-599 - Server errors (not caused by user)

// Catch all error handler
// Handle any errors coming from middleware of prior route handlers
app.use((error, req, res, next) => {
  console.log('There was an error handling a request', error);
  const message = error.message;
  res.status(message === 'NOT_FOUND' ? 404 : 500);
  res.render('error', { message });
});

module.exports = app;
