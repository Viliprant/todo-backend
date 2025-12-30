import request from 'supertest';
import app from '../app';
import { resetTodos } from '../services/todo.service';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

describe('📝 Todo Routes', () => {
  const payload = { id: '123', email: 'test@test.com' };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  beforeEach(() => resetTodos());

  describe('GET /todos', () => {
    it('should return 200 with array of todos', async () => {
      const res = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return empty array on initial call', async () => {
      const res = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toEqual(0);
    });
  });

  describe('POST /todos', () => {
    describe('Success Case', () => {
      it('should return 201 and create a new todo', async () => {
        const res = await request(app)
          .post('/todos')
          .set('Authorization', `Bearer ${token}`)
          .send({ title: 'New test todo' });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe('New test todo');
      });
    });

    describe('Validation Errors', () => {
      it('should return 400 when title is missing', async () => {
        const res = await request(app)
          .post('/todos')
          .set('Authorization', `Bearer ${token}`)
          .send({});

        expect(res.statusCode).toBe(400);
        expect(res.body).toMatchObject({
          message: 'Validation error',
          errors: [
            {
              path: 'title',
              message: "Le titre n'est pas renseigné ou est invalide.",
            },
          ],
        });
      });
    });
  });
});
