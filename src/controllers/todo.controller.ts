import { Request, Response } from 'express';
import { getTodos, addTodo } from '../services/todo.service';

export const getAllTodos = (_req: Request, res: Response) => {
  res.json(getTodos());
};

export const createTodo = (req: Request, res: Response) => {
  const { title } = req.body;
  const todo = addTodo(title);
  res.status(201).json(todo);
};
