import { Request, Response } from 'express';
import AuthService from '../services/auth.service';

export default class AuthController {
  static async login(req: Request, res: Response) {
    if (!req.body?.email || !req.body?.password)
      throw new Error('Email or password empty');

    const { email, password } = req.body;

    const safeUser = await AuthService.login(email, password);

    res.json({ token: safeUser.token });
  }

  static async register(req: Request, res: Response) {
    if (!req.body?.email || !req.body?.password)
      throw new Error('Email or password empty');

    const { email, password } = req.body;
    await AuthService.register(email, password);

    res.status(201).json();
  }
}
