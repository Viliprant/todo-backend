import { Router } from 'express';
import TodoController from '../controllers/todo.controller';

const todoRoutes = Router();

todoRoutes.get('/', TodoController.getAllTodos);
todoRoutes.post('/', TodoController.createTodo);

export default todoRoutes;
