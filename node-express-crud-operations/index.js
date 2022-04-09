const express = require('express');
const mongoose = require('mongoose');
const Hero = require('./models/hero');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  Hero.find()
    .then((heroes) => {
      res.render('home', { heroes });
    })
    .catch((error) => {
      console.log('Failed to list heroes', error);
    });
});

app.get('/hero/create', (req, res) => {
  res.render('create');
});

app.get('/hero/:id', (req, res) => {
  const { id } = req.params;
  Hero.findById(id)
    .then((hero) => {
      res.render('hero', { hero });
    })
    .catch((error) => {
      console.log('Could not load hero', error);
    });
});

app.get('/hero/:id/update', (req, res) => {
  const { id } = req.params;
  Hero.findById(id)
    .then((hero) => {
      res.render('update', { hero });
    })
    .catch((error) => {
      console.log('Could not load hero', error);
    });
});

app.post('/hero/create', (req, res) => {
  const { name, superpower } = req.body;
  Hero.create({ name, superpower })
    .then((hero) => {
      const id = hero._id;
      res.redirect('/hero/' + id);
    })
    .catch(() => {
      console.log('There was an error creating the hero.');
    });
});

app.post('/hero/:id/update', (req, res) => {
  const { id } = req.params;
  const { name, superpower } = req.body;
  Hero.findByIdAndUpdate(id, { name, superpower })
    .then(() => {
      res.redirect('/hero/' + id);
    })
    .catch((error) => {
      console.log('Error updating hero', error);
    });
});

app.post('/hero/:id/delete', (req, res) => {
  const { id } = req.params;
  Hero.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log('Error deleting hero', error);
    });
});

// Connect to mongoDB
mongoose
  .connect('mongodb://localhost:27017/superheroes')
  .then(() => {
    // Listen to request on port 3000 once connection has been established
    app.listen(3000, () => {
      console.log('Application connected. Visit http://localhost:3000');
    });
  })
  .catch((error) => {
    console.log('There was an error connecting to mongoDB');
  });
