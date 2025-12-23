import { getTodos, addTodo, resetTodos } from '../services/todo.service';

describe('Todo Service', () => {
  beforeEach(() => resetTodos());

  it('should add a new todo', () => {
    const todo = addTodo('Test todo');
    expect(todo.title).toBe('Test todo');
    expect(todo.completed).toBe(false);
  });

  it('should return all todos', () => {
    addTodo('Test todo');
    const todos = getTodos();
    expect(todos.length).toBeGreaterThan(0);
  });

  it('should return empty todos', () => {
    addTodo('Test todo');
    addTodo('Test todo');
    resetTodos();
    const todos = getTodos();
    expect(todos.length).toEqual(0);
  });
});
