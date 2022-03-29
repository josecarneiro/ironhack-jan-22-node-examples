// http://www.omdbapi.com/?apikey=39520174&s=spider-man

const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('home');
});

app.get('/results', (request, response) => {
  const term = request.query.term;
  axios
    .get('http://www.omdbapi.com/?apikey=39520174&s=' + term)
    .then((result) => {
      const data = result.data;
      const movies = data.Search;
      response.render('results', { movies: movies });
    })
    .catch((error) => {
      console.log(error);
      response.send('There was an error searching.');
    });
});

// tt6320628

app.get('/movie/:id', (request, response) => {
  const id = request.params.id;
  axios
    .get('http://www.omdbapi.com/?apikey=39520174&i=' + id)
    .then((result) => {
      const data = result.data;
      const movie = data;
      response.render('movie', { movie: movie });
    })
    .catch((error) => {
      console.log(error);
      response.send('There was an error fetching the movie.');
    });
});

app.listen(3000);
