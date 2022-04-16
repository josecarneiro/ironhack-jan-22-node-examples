const express = require('express');
const baseRouter = new express.Router();
const User = require('./../models/user');
const bcryptjs = require('bcryptjs');
const routeGuard = require('./../middleware/route-guard');

// GET - / - Displays home page
baseRouter.get('/', (req, res) => {
  res.render('home');
});

// GET - /login - Displays login form
baseRouter.get('/login', (req, res) => {
  res.render('login');
});

// POST - /login - Handles login form submission
baseRouter.post('/login', (req, res, next) => {
  const { email, password } = req.body;
  let user;
  User.findOne({ email })
    .then((doc) => {
      user = doc;
      // If a user with this email exists, user will hold user document
      // If no user exists, user will hold null
      if (user === null) {
        // Stop the promise chain,
        // throwing an error inside the promise chain takes us immediately to the catch
        throw new Error('There is no user with that email.');
        // return Promise.reject(new Error('There is no user with that email.'));
      } else {
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((comparisonResult) => {
      if (comparisonResult) {
        req.session.userId = user._id;
        res.redirect('/private');
      } else {
        throw new Error('Wrong password');
      }
    })
    .catch((error) => {
      next(error);
    });
});

// GET - /register - Displays register form
baseRouter.get('/register', (req, res) => {
  res.render('register');
});

// POST - /register - Handles register form submission
baseRouter.post('/register', (req, res, next) => {
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((passwordHashAndSalt) => {
      return User.create({
        name,
        email,
        passwordHashAndSalt
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.redirect('/private');
    })
    .catch((error) => {
      next(error);
    });
});

// GET - /private - Displays private page to authenticated users only
baseRouter.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

// POST - /logout - Signs out user
baseRouter.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = baseRouter;
