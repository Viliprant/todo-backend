import { RequestHandler } from 'express';
import { ZodType } from 'zod/v4';

export const validateBody =
  (schema: ZodType<unknown>): RequestHandler =>
  (req, _res, next) => {
    schema.parse(req.body);
    next();
  };

export const validateParams =
  (schema: ZodType<unknown>): RequestHandler =>
  (req, _res, next) => {
    schema.parse(req.params);
    next();
  };

export const validateQuery =
  (schema: ZodType<unknown>): RequestHandler =>
  (req, _res, next) => {
    schema.parse(req.query);
    next();
  };
