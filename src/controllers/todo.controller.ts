import { Request, Response } from 'express';
import { getTodos, addTodo } from '../services/todo.service';

export default class TodoController {
  static getAllTodos = (_req: Request, res: Response) => {
    res.json(getTodos());
  };

  static createTodo = (req: Request, res: Response) => {
    const { title } = req.body;
    const todo = addTodo(title);
    res.status(201).json(todo);
  };
}
