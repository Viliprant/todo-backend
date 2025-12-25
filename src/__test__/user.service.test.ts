import { User } from '../models/user.model';
import { addUser, getUserById, resetUsers } from '../services/user.service';

describe('User service', () => {
  beforeEach(() => resetUsers());

  it('Should create an user', async () => {
    const email = 'test@test.com';
    const password = 'superpassword';
    const newUser: User = await addUser(email, password);

    expect(newUser.id).toBeDefined();
    // Vérifie que l'id correspond à un format UUID v4
    expect(newUser.id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
  });

  it('Should not create an user if the email is already taken', async () => {
    const email = 'test@test.com';
    const password = 'superpassword';
    await addUser(email, password);

    expect(addUser(email, password)).rejects.toThrow(
      `L'adresse mail est déjà utilisé : [${email}].`,
    );
  });

  it('Should find and return the user', async () => {
    const email = 'test@test.com';
    const password = 'superpassword';
    const addedUser = await addUser(email, password);
    const foundUser = getUserById(addedUser.id);

    expect(foundUser).toMatchObject({
      id: addedUser.id,
      email,
    });
  });

  it('Should not find an user and throw an error', () => {
    const id = 'test';

    expect(() => getUserById(id)).toThrow(
      `L'utilisateur n'existe pas : [${id}].`,
    );
  });
});
