import { Router } from 'express';
import { getAllTodos, createTodo } from '../controllers/todo.controller';

const router = Router();

router.get('/', getAllTodos);
router.post('/', createTodo);

export default router;
