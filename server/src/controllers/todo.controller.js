const { Todo } = require('../db/models');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { userId: req.user.id } });
    res.json(todos);
  } catch (err) {
    console.error('Ошибка getTodos:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      userId: req.user.id,
    });
    res.json(todo);
  } catch (err) {
    console.error('Ошибка createTodo:', err);
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    todo.status = req.body.status;
    await todo.save();

    res.json(todo);
  } catch (err) {
    console.error('Ошибка updateTodo:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await todo.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Ошибка deleteTodo:', err);
    res.status(400).json({ message: err.message });
  }
};