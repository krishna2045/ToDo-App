const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const DATA_FILE = path.join(__dirname, 'todos.json');
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

function readTodos() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2), 'utf8');
}

app.get('/todos', (req, res) => {
  res.json(readTodos());
});

app.post('/todos', (req, res) => {
  const todos = readTodos();
  const todo = req.body;
  todo.id = Date.now();
  todos.push(todo);
  writeTodos(todos);
  res.status(201).json(todo);
});

app.put('/todos/:id', (req, res) => {
  const todos = readTodos();
  const id = Number(req.params.id);
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).send('Not found');
  todos[idx] = { ...todos[idx], ...req.body };
  writeTodos(todos);
  res.json(todos[idx]);
});

app.delete('/todos/:id', (req, res) => {
  const todos = readTodos();
  const id = Number(req.params.id);
  const next = todos.filter(t => t.id !== id);
  writeTodos(next);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`Todo JSON server running on ${PORT}`));
