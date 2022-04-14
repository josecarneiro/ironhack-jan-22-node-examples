const express = require('express');
const baseRouter = require('./routes/base');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: false }));

app.use(baseRouter);

module.exports = app;
