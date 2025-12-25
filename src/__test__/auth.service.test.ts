import { login, register, verifyToken } from '../services/auth.service';
import { addUser, getUserByEmail, resetUsers } from '../services/user.service';

describe('Auth service', () => {
  beforeEach(() => resetUsers());

  it('should return the user after login', async () => {
    const email = 'test@test.com';
    const password = 'superpassword';
    const addedUser = await addUser(email, password);
    const foundUser = await login(email, password);

    expect(foundUser).toMatchObject({
      id: addedUser.id,
      email,
    });
    expect(foundUser).toHaveProperty('token');
  });

  it('should throw an error when the email is wrong', async () => {
    const email = 'test@test.com';
    const password = 'superpassword';

    expect(login(email, password)).rejects.toThrow(
      `L'utilisateur n'existe pas : [${email}].`,
    );
  });

  it('should throw an error when the password is wrong', async () => {
    const email = 'test@test.com';
    const password = 'superpassword';
    const badPassword = 'superpasswordp';
    await addUser(email, password);

    expect(login(email, badPassword)).rejects.toThrow(
      `Le mot de passe n'est pas le même : [${badPassword}].`,
    );
  });

  it('should create a new user', async () => {
    const email = 'test@test.com';
    const password = 'superpassword';

    await register(email, password);

    const foundUser = getUserByEmail(email);

    expect(foundUser).toBeDefined();
  });

  it('should return the token', async () => {
    const email = 'test@test.com';
    const password = 'superpassword';
    await addUser(email, password);
    const foundUser = await login(email, password);
    const decoded = verifyToken(foundUser.token);

    expect(decoded).toBeDefined();
  });
});
