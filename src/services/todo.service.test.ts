import { getTodos, addTodo, resetTodos } from './todo.service';

describe('📝 Todo Service', () => {
  beforeEach(() => resetTodos());

  describe('addTodo()', () => {
    it('should create a new todo with completed = false', () => {
      const todo = addTodo('Test todo');
      expect(todo.title).toBe('Test todo');
      expect(todo.completed).toBe(false);
    });
  });

  describe('getTodos()', () => {
    it('should return all todos after adding', () => {
      addTodo('Test todo');
      const todos = getTodos();
      expect(todos.length).toBeGreaterThan(0);
    });

    it('should return empty array after reset', () => {
      addTodo('Test todo');
      addTodo('Test todo');
      resetTodos();
      const todos = getTodos();
      expect(todos.length).toEqual(0);
    });
  });
});
