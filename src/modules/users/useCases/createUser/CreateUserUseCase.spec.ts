import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { MockUsersRepo } from '../../mocks/MockUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

let mockUserRepo: MockUsersRepo;
let createUseUseCase: CreateUserUseCase;

describe('Create a new user', () => {
  beforeEach(() => {
    mockUserRepo = new MockUsersRepo();
    createUseUseCase = new CreateUserUseCase(mockUserRepo);
  });
  it('Should be able to create a new user', async () => {
    const user = await createUseUseCase.execute({
      name: 'user test',
      email: 'user@test.com',
      password: 'dev',
    });

    expect(user).toHaveProperty('id');
  });

  it('Shold throw error if email, password or name is undefined', async () => {
    await expect(
      createUseUseCase.execute({
        name: '',
        email: 'user@test.com',
        password: 'dev',
      }),
    ).rejects.toEqual(new AppError('Name, email and password are required!'));

    await expect(
      createUseUseCase.execute({
        name: 'user test',
        email: 'user@test.com',
        password: '',
      }),
    ).rejects.toEqual(new AppError('Name, email and password are required!'));

    await expect(
      createUseUseCase.execute({
        name: 'user test',
        email: '',
        password: 'dev',
      }),
    ).rejects.toEqual(new AppError('Name, email and password are required!'));
  });

  it('Shold throw error if email is already in use', async () => {
    await createUseUseCase.execute({
      name: 'user test',
      email: 'user@test.com',
      password: 'dev',
    });

    await expect(
      createUseUseCase.execute({
        name: 'user test',
        email: 'user@test.com',
        password: 'dev',
      }),
    ).rejects.toEqual(new AppError('User already exists'));
  });
});
