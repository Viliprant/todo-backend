import Todo from '../models/todo.model';

const todos: Todo[] = [];

export const getTodos = (): Todo[] => todos;

export const addTodo = (title: string): Todo => {
  const newTodo: Todo = {
    id: todos.length + 1,
    title,
    completed: false,
  };

  todos.push(newTodo);

  return newTodo;
};

export const resetTodos = (): void => {
  todos.length = 0;
};
