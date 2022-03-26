const express = require('express');
const hbs = require('hbs');

// To be able to use partials in handlebars,
// we need to tell the hbs templating engine
// where partial templates are located
hbs.registerPartials(__dirname + '/views/partials');

const app = express();

// Tells express to use the handlebars
// templating engine to render views
app.set('view engine', 'hbs');

// Tells express where to load views from
app.set('views', __dirname + '/views');

// Allow contents of public directory to be loaded
app.use(express.static('public'));

// Set property pageTitle to a default value
// for every template that gets rendered
// and is not provided with a pageTitle property
// The app.locals object is combined with the data object
// when rendering each template
app.locals.pageTitle = 'My Application';

app.get('/', (request, response) => {
  // Render method will allow us to dynamically render a view
  // The method gets the name of the template we want to render
  // (the path of the hbs file relative to the views directory
  // without the .hbs extension)
  // Express will ask the rendering engine to render this template
  // into plain HTML, and will send the resulting HTML as a response
  // to the user request.
  // As the second argument to the render method,
  // we can optionally pass a data object
  // Each property of the data object will be available
  // in the rendered template as a "handlebars variable"
  response.render('home', { message: 'Hola Mundo', foo: 'bar' });
});

app.get('/jose', (request, response) => {
  response.render('person', {
    pageTitle: 'José Profile',
    name: 'José',
    city: 'Lisbon',
    profession: {
      title: 'Instructor',
      company: 'Ironhack'
    },
    pets: [
      { name: 'Whiskers', species: 'cat', isWellBehaved: false },
      { name: 'Panda', species: 'dog', isWellBehaved: true }
    ],
    favoriteBeverages: [
      { name: 'Iced Coffee', temperature: 'ice' },
      { name: 'Sparkling Water', temperature: 'hot' },
      { name: 'Orange Juice', temperature: 'normal' }
    ]
  });
});

app.get('/ana', (request, response) => {
  response.render('person', { name: 'Ana', city: 'Porto' });
});

app.listen(3000);
