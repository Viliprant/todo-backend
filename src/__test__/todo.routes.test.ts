import request from 'supertest';
import app from '../app';
import { resetTodos } from '../services/todo.service';

describe('Todo Routes', () => {
  beforeEach(() => resetTodos());

  it('GET /todos should return array', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /todos should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .send({ title: 'New test todo' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('New test todo');
  });

  it('POST /todos without title should return 400', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.statusCode).toBe(400);
  });

  it('POST /todos should return empty array', async () => {
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toEqual(0);
  });
});
