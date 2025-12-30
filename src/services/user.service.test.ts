import { User } from '../models/user.model';
import { addUser, getUserById, resetUsers } from './user.service';

describe('👤 User Service', () => {
  beforeEach(() => resetUsers());

  describe('addUser()', () => {
    describe('Success Case', () => {
      it('should create a new user with valid UUID', async () => {
        const email = 'test@test.com';
        const password = 'superpassword';
        const newUser: User = await addUser(email, password);

        expect(newUser.id).toBeDefined();
        // Vérifie que l'id correspond à un format UUID v4
        expect(newUser.id).toMatch(
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
        );
      });
    });

    describe('Error Cases', () => {
      it('should throw error when email already exists', async () => {
        const email = 'test@test.com';
        const password = 'superpassword';
        await addUser(email, password);

        expect(addUser(email, password)).rejects.toThrow(
          `L'adresse mail est déjà utilisé : [${email}].`,
        );
      });
    });
  });

  describe('getUserById()', () => {
    describe('Success Case', () => {
      it('should find and return user by ID', async () => {
        const email = 'test@test.com';
        const password = 'superpassword';
        const addedUser = await addUser(email, password);
        const foundUser = getUserById(addedUser.id);

        expect(foundUser).toMatchObject({
          id: addedUser.id,
          email,
        });
      });
    });

    describe('Error Cases', () => {
      it('should throw error when user ID does not exist', () => {
        const id = 'test';

        expect(() => getUserById(id)).toThrow(
          `L'utilisateur n'existe pas : [${id}].`,
        );
      });
    });
  });
});
