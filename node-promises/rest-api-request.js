// REST API

// API - Application Programming Interface
// UI - User Interface

const axios = require('axios');

axios
  .get('http://www.omdbapi.com/?apikey=39520174&s=spider-man')
  .then((response) => {
    const data = response.data;
    const movies = data.Search;
    console.log(movies);
  })
  .catch((error) => {
    console.log('There was an error with the request.');
  });
