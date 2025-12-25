import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { JwtPayload } from '../models/user.model';

export function authHandler(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) throw new MissingTokenError();

  try {
    const decodedRaw = jwt.verify(token, JWT_SECRET);

    if (!decodedRaw || typeof decodedRaw !== 'object') {
      throw new InvalidTokenError();
    }

    (req as any).user = decodedRaw as JwtPayload; // Stocke les infos du token dans la requête
  } catch (err: unknown) {
    throw new InvalidTokenError();
  }

  return next();
}

export class MissingTokenError extends Error {
  constructor() {
    super('Token manquant');
  }
}
export class InvalidTokenError extends Error {
  constructor() {
    super('Token invalide ou expiré');
  }
}
