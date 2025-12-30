import { User } from '../models/user.model';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const users: User[] = [];

export const getUserById = (id: string): User => {
  const foundUser: User | undefined = users.find((user) => user.id === id);

  if (foundUser === undefined)
    throw new Error(`L'utilisateur n'existe pas : [${id}].`);

  return foundUser;
};

export const getUserByEmail = (email: string): User => {
  const foundUser: User | undefined = users.find(
    (user) => user.email === email,
  );

  if (foundUser === undefined)
    throw new Error(`L'utilisateur n'existe pas : [${email}].`);

  return foundUser;
};

export const addUser = async (
  email: string,
  password: string,
): Promise<User> => {
  const isAlreadyRegistered = checkExistingEmail(email);
  if (isAlreadyRegistered)
    throw new Error(`L'adresse mail est déjà utilisé : [${email}].`);

  const newUser: User = {
    email,
    password: await bcrypt.hash(password, 10),
    id: crypto.randomUUID(),
  };

  users.push(newUser);

  return newUser;
};

export const resetUsers = (): void => {
  users.length = 0;
};

const checkExistingEmail = (email: string): boolean => {
  const foundUser = users.find((user) => user.email === email);

  if (foundUser === undefined) return false;

  return true;
};
