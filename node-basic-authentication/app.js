const express = require('express');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const baseRouter = require('./routes/base');
const User = require('./models/user');
// const deserializeUser = require('./middleware/deserialize-user');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));
app.use(
  expressSession({
    secret: 'abcafsdfagfsafads',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000 // 15 days
    },
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/node-basic-authentication',
      ttl: 60 * 60 // 60 minutes before connection is refreshed
    })
  })
);

// Middleware is a function that runs for every request
// it takes req, res, next, performs some logic
// and calls next when it purpose is complete
// When you call next and don't pass it any value (such as an error object)
// express will move on with the request handling,
// pass the request to other middleware installed on the app
// and finally the request will be handled by the appropriate handler
const deserializeUser = (req, res, next) => {
  const userId = req.session.userId;
  if (userId) {
    User.findById(userId)
      .then((user) => {
        // We're making the user object accessible to any request handler
        // that runs after this middleware by binding it to the req object
        req.user = user;
        // If you set any properties in the res.locals object
        // they are made available to the templates rendered in your application
        // Make user object available to any template the application renders
        // for this request
        res.locals.user = user;
        // We tell express to move on and handle the request elsewhere
        next();
      })
      .catch((error) => {
        // We're telling express to execute the catch all error handler
        next(error);
      });
  } else {
    // We tell express to move on and handle the request elsewhere
    next();
  }
};

app.use(deserializeUser);

// const middlewareA = (req, res, next) => {
//   console.log('A');
//   next();
// };

// const middlewareB = (req, res, next) => {
//   console.log('B');
//   next();
// };

// app.use(middlewareA);
// app.use(middlewareB);

// app.use(middlewareA, middlewareB);

app.use(baseRouter);

// The catch all error handling function
// gets executed whenever next() is called anywhere in the application
// AND an error object is passed to next
// eg. next(new Error('FOO'))
app.use((error, req, res, next) => {
  res.render('error');
});

module.exports = app;
