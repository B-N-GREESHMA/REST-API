const express = require('express');
const app = express();
app.use(express.json());

let books = [];
let id = 1;

app.get('/books', (req, res) => res.json(books));

app.post('/books', (req, res) => {
  const book = { id: id++, ...req.body };
  books.push(book);
  res.status(201).json(book);
});

app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).send('Book not found');
  book.title = req.body.title;
  book.author = req.body.author;
  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  books = books.filter(b => b.id != req.params.id);
  res.send('Book deleted');
});

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
