# CRUD Application

- Create
- Read
- Update
- Delete

## Superhero management application

Database: superheroes

Collection: heroes

Documents:

- name
- superpower

### Pages

Each is going to render a view. One template per page.

- / -> Home page. Displays list of superheroes.
- /hero/:id -> Display single hero.
- /hero/:id/update -> Display single hero update form.
- /hero/create -> Create single hero.

### Route Handlers

- GET - '/' -> Hero.find() -> render 'home.hbs' and pass it list of heroes
- GET - '/hero/:id' -> Hero.findById(request.params.id) -> renders 'hero.hbs' and passes hero object
- GET - '/hero/:id/update' -> Hero.findById(request.params.id) -> renders 'update.hbs' and passes hero object that is populated onto form
- GET - '/hero/create' -> renders 'create.hbs' which displays form requiring hero info
- POST - '/hero/create' -> Hero.create({ name: request.body.name, ... }) -> redirect back to the single hero page for the newly created hero
- POST - '/hero/:id/update' -> Hero.findByIdAndUpdate(request.params.id, { ... }) -> redirect back to the single hero page
- POST - '/hero/:id/delete' -> Hero.findByIdAndDelete(request.params.id) -> redirect back to home page

### Models

Hero

- name: String, maxLength: 100, required: true, unique: true
- superpower: String, required: true
