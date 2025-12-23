import { Request, Response } from 'express';
import { getTodos, addTodo } from '../services/todo.service';
import { getErrorMessage } from '../utils/errorhandler';

export const getAllTodos = (_req: Request, res: Response) => {
  res.json(getTodos());
};

export const createTodo = (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const todo = addTodo(title);
    res.status(201).json(todo);
  } catch (error: any) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
};
