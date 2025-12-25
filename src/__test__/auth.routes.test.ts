import { addUser, resetUsers } from '../services/user.service';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import app from '../app';
import { JWT_SECRET } from '../config';

describe('AuthController', () => {
  beforeEach(() => {
    resetUsers();
  });

  describe('Login controller', () => {
    it('POST /auth/login should throw error when email is missing', async () => {
      const res = await request(app).post('/auth/login').send({
        password: 'password',
        email: '',
      });

      expect(res.statusCode).toBe(400);
    });

    it('should throw error when password is missing', async () => {
      const res = await request(app).post('/auth/login').send({
        password: '',
        email: 'test@test.com',
      });

      expect(res.statusCode).toBe(400);
    });

    it('should successfully login and return token', async () => {
      const password = 'password';
      const email = 'test@test.com';

      await addUser(email, password);
      const res = await request(app).post('/auth/login').send({
        password,
        email,
      });

      expect(res.statusCode).toBe(200);

      expect(res.body.token).toBeDefined();
      expect(typeof res.body.token).toBe('string');

      const decoded = jwt.verify(res.body.token, JWT_SECRET);

      expect(decoded).toHaveProperty('id');
      expect(decoded).toHaveProperty('email', email);
    });
  });

  describe('register', () => {
    it('should throw error when email is missing', async () => {});

    it('should throw error when password is missing', async () => {});

    it('should successfully register a new user', async () => {});
  });
});
