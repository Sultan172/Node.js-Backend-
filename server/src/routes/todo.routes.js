const router = require('express').Router();
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo.controller');

const {
  createTodoSchema,
  updateTodoSchema,
} = require('../validators/todo.validator');

router.use(auth);

router.get('/', getTodos);
router.post('/', validate(createTodoSchema), createTodo);
router.patch('/:id', validate(updateTodoSchema), updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
