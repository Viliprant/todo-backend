import { SafeUser, User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { addUser, getUserByEmail } from './user.service';
import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';

export const login = async (
  email: string,
  password: string,
): Promise<SafeUser> => {
  if (!email || !password)
    throw new Error('Email et/ou mot de passe manquant.');

  const foundUser: User = getUserByEmail(email);

  const isMatching = await bcrypt.compare(password, foundUser.password);

  if (!isMatching)
    throw new Error(`Le mot de passe n'est pas le même : [${password}].`);

  const token = signToken(foundUser.id);

  return toSafeUser({ ...foundUser, token });
};

export const register = async (
  email: string,
  password: string,
): Promise<boolean> => {
  await addUser(email, password);
  return true;
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const toSafeUser = (user: User): SafeUser => {
  if (!user.token) throw new Error(`Aucun token trouvé pour : ${user}`);

  return {
    id: user.id,
    email: user.email,
    token: user.token,
  };
};

const signToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};
