const mongoose = require('mongoose');
const app = require('./app');

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
