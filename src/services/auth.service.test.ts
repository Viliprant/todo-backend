import AuthService from './auth.service';
import { addUser, getUserByEmail, resetUsers } from './user.service';

describe('🔐 Auth Service', () => {
  beforeEach(() => resetUsers());

  describe('login()', () => {
    describe('Success Case', () => {
      it('should return user with token on valid credentials', async () => {
        const email = 'test@test.com';
        const password = 'superpassword';
        const addedUser = await addUser(email, password);
        const foundUser = await AuthService.login(email, password);

        expect(foundUser).toMatchObject({
          id: addedUser.id,
          email,
        });
        expect(foundUser).toHaveProperty('token');
      });
    });

    describe('Error Cases', () => {
      it('should throw error when email does not exist', async () => {
        const email = 'test@test.com';
        const password = 'superpassword';

        expect(AuthService.login(email, password)).rejects.toThrow(
          `L'utilisateur n'existe pas : [${email}].`,
        );
      });

      it('should throw error when password is incorrect', async () => {
        const email = 'test@test.com';
        const password = 'superpassword';
        const badPassword = 'superpasswordp';
        await addUser(email, password);

        expect(AuthService.login(email, badPassword)).rejects.toThrow(
          `Le mot de passe n'est pas le même : [${badPassword}].`,
        );
      });
    });
  });

  describe('register()', () => {
    it('should create a new user', async () => {
      const email = 'test@test.com';
      const password = 'superpassword';

      await AuthService.register(email, password);

      const foundUser = getUserByEmail(email);
      expect(foundUser).toBeDefined();
    });
  });

  describe('verifyToken()', () => {
    it('should decode and return token payload', async () => {
      const email = 'test@test.com';
      const password = 'superpassword';
      await addUser(email, password);
      const foundUser = await AuthService.login(email, password);
      const decoded = AuthService.verifyToken(foundUser.token);

      expect(decoded).toBeDefined();
    });
  });
});
