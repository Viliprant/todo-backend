import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import request from 'supertest';
import app from '../app';

describe('🔐 Auth Middleware', () => {
  const payload = { id: '123', email: 'test@test.com' };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

  describe('Token Validation', () => {
    it('should block requests without token (401)', async () => {
      const res = await request(app).get('/todos');

      expect(res.status).toBe(401);
      expect(res.body.message).toBe('Token manquant');
    });

    it('should block requests with invalid token (403)', async () => {
      const res = await request(app)
        .get('/todos')
        .set('Authorization', 'Bearer invalidtoken');

      expect(res.status).toBe(403);
      expect(res.body.message).toBe('Token invalide ou expiré');
    });
  });

  describe('Valid Requests', () => {
    it('should allow requests with valid token (200)', async () => {
      const res = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toBe(200);
    });
  });
});
