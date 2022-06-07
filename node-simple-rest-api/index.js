const express = require('express');
const cors = require('cors');

const app = express();

app.use(
  cors({
    origin: ['https://example-client.netlify.app']
  })
);

/* Parse request bodies encoded with the JSON format
instead of the application/x-www-form-urlencoded format */
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const students = [
  { id: '1', name: 'Nina' },
  { id: '2', name: 'Umar' },
  { id: '3', name: 'Rafa' }
];

app.get('/', (req, res, next) => {
  res.json({ message: 'Hello world' });
});

app.get('/students', (req, res, next) => {
  res.json({ results: students });
});

app.get('/students/:id', (req, res, next) => {
  const { id } = req.params;
  const student = students.find((item) => item.id === id);
  res.json({ result: student });
});

app.post('/students', (req, res, next) => {
  const student = { id: '4', name: req.body.name };
  res.json({ result: student });
});

app.listen(3010);
