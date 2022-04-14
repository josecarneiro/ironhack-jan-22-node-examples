const mongoose = require('mongoose');

const app = require('./app');

mongoose
  .connect('mongodb://localhost:27017/node-basic-authentication')
  .then(() => {
    app.listen(3000, () => {
      console.log('Application running. Visit it on http://localhost:3000');
    });
  })
  .catch((error) => {
    console.log('There was an error connecting to the database.', error);
  });
