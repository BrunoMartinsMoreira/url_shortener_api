import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { MockUsersRepo } from '../../mocks/MockUsersRepository';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let mockUsersRepo: MockUsersRepo;
let authUseCase: AuthenticateUserUseCase;

describe('Authenticate a user', () => {
  beforeEach(() => {
    mockUsersRepo = new MockUsersRepo();
    authUseCase = new AuthenticateUserUseCase(mockUsersRepo);
  });

  it('Shoul throw error if email does not exists or is incorrect', async () => {
    await mockUsersRepo.create({
      name: 'user test',
      email: 'user@test.com',
      password: 'dev',
    });

    await expect(
      authUseCase.execute({
        email: 'user@testfail.com',
        password: 'dev',
      }),
    ).rejects.toEqual(new AppError('Incorret email or password', 401));
  });

  it('Shoul throw error if password is incorrect', async () => {
    await mockUsersRepo.create({
      name: 'user test',
      email: 'user@test.com',
      password: 'dev',
    });

    await expect(
      authUseCase.execute({
        email: 'user@test.com',
        password: 'incorrect-password',
      }),
    ).rejects.toEqual(new AppError('Incorret email or password', 401));
  });
});
