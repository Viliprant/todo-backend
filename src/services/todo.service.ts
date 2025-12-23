import { Todo } from '../models/todo.model';

let todos: Todo[] = [];

export const getTodos = (): Todo[] => todos;

export const addTodo = (title: string): Todo => {
  if (!title) throw new Error('Title is missing');
  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

export const resetTodos = (): void => {
  todos = [];
};
