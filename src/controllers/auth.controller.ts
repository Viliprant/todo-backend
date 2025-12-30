import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { RegisterDto } from '../schemas/user.schema';

export default class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password }: RegisterDto = req.body;

    const safeUser = await AuthService.login(email, password);

    res.json({ token: safeUser.token });
  }

  static async register(req: Request, res: Response) {
    const { email, password }: RegisterDto = req.body;

    await AuthService.register(email, password);

    res.status(201).json();
  }
}
