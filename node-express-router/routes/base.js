const express = require('express');
const Hero = require('../models/hero');

const router = new express.Router();

router.get('/', (req, res, next) => {
  Hero.find()
    .then((heroes) => {
      res.render('home', { heroes });
    })
    .catch((error) => {
      console.log('Failed to list heroes', error);
      next(error);
    });
});

router.get('/hero/create', (req, res) => {
  res.render('create');
});

router.get('/hero/:id', (req, res, next) => {
  const { id } = req.params;
  Hero.findById(id)
    .then((hero) => {
      res.render('hero', { hero });
    })
    .catch((error) => {
      console.log('Could not load hero', error);
      next(error);
    });
});

router.get('/hero/:id/update', (req, res, next) => {
  const { id } = req.params;
  Hero.findById(id)
    .then((hero) => {
      res.render('update', { hero });
    })
    .catch((error) => {
      console.log('Could not load hero', error);
      next(error);
    });
});

router.post('/hero/create', (req, res, next) => {
  const { name, superpower } = req.body;
  Hero.create({ name, superpower })
    .then((hero) => {
      const id = hero._id;
      res.redirect('/hero/' + id);
    })
    .catch((error) => {
      console.log('There was an error creating the hero.');
      // res.render('error');
      // We're telling express that this request handling function
      // is not going to respond to the user,
      // and that a "catch all error handler" should respond instead
      next(error);
    });
});

router.post('/hero/:id/update', (req, res, next) => {
  const { id } = req.params;
  const { name, superpower } = req.body;
  Hero.findByIdAndUpdate(id, { name, superpower })
    .then(() => {
      res.redirect('/hero/' + id);
    })
    .catch((error) => {
      console.log('Error updating hero', error);
      next(error);
    });
});

router.post('/hero/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Hero.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log('Error deleting hero', error);
      next(error);
    });
});

module.exports = router;
