const User = require('./../models/user');

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

module.exports = deserializeUser;
