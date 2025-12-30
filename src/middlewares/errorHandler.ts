// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { MissingTokenError, InvalidTokenError } from './authHandler';
import { ZodError } from 'zod/v4';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      })),
    });
  } else if (err instanceof MissingTokenError) {
    res.status(401).json({ message: err.message });
  } else if (err instanceof InvalidTokenError) {
    res.status(403).json({ message: err.message });
  } else if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
