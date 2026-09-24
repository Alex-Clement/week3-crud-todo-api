const express = require('express');

const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Node.js', completed: false },
  { id: 2, task: 'Build Todo API', completed: false }
];

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.post('/todos', (req, res) => {
  const { Task } = req.body;

  if (!Task) {
    return res.status(400).json({
      error: 'Task field is required'
    });
  }

  const newTodo = {
    id: todos.length + 1,
    task: Task,
    completed: false
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.get('/todos/active', (req, res) => {
  const activeTodos = todos.filter((todo) => !todo.completed);

  res.status(200).json(activeTodos);
});

app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      error: 'Todo not found'
    });
  }

  res.status(200).json(todo);
});

app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({
      error: 'Todo not found'
    });
  }

  Object.assign(todo, req.body);

  res.status(200).json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const todoExists = todos.some((todo) => todo.id === id);

  if (!todoExists) {
    return res.status(404).json({
      error: 'Todo not found'
    });
  }

  todos = todos.filter((todo) => todo.id !== id);

  res.status(204).send();
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});