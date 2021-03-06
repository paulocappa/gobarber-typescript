import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUsers', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'Fulano',
      email: 'email@fulano.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id');
  })

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      name: 'Fulano',
      email: 'email@fulano.com',
      password: '123456'
    })

    await expect(createUser.execute({
      name: 'Fulano 2',
      email: 'email@fulano.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  })
})
