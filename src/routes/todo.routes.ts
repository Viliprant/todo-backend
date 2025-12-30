import { Router } from 'express';
import TodoController from '../controllers/todo.controller';
import { validateBody } from '../middlewares/zodHandler';
import { createTodoSchema } from '../schemas/todo.schema';

const todoRoutes = Router();

todoRoutes.get('/', TodoController.getAllTodos);
todoRoutes.post('/', validateBody(createTodoSchema), TodoController.createTodo);

export default todoRoutes;
