import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { MockUrlsRepository } from '../../mocks/MockUrlRepository';
import { CreateUrlUseCase } from './CreateUrlUseCase';

let mockUrlsRepo: MockUrlsRepository;
let createUrlUseCase: CreateUrlUseCase;

describe('Create a new url', () => {
  beforeEach(() => {
    mockUrlsRepo = new MockUrlsRepository();
    createUrlUseCase = new CreateUrlUseCase(mockUrlsRepo);
  });

  it('Should be able to create a new url', async () => {
    const url = await createUrlUseCase.execute({
      user_id: 'te5t3',
      original_url: 'https://www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
    });

    expect(url).toHaveProperty('id');
    expect(url).toHaveProperty('original_url');
    expect(url).toHaveProperty('shortUrl');
    expect(url).toHaveProperty('created_at');
    expect(url.last_click_date).toBe(null);
  });

  it('Shoul throw error if original url is invalid', async () => {
    await expect(
      createUrlUseCase.execute({
        user_id: 'te5t3h7',
        original_url: 'https//www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
      }),
    ).rejects.toEqual(new AppError('Invalid url'));
  });

  it('Shoul throw error if original url already exists', async () => {
    await createUrlUseCase.execute({
      user_id: 'te5t3h7',
      original_url: 'https://www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
    });
    await expect(
      createUrlUseCase.execute({
        user_id: 'te5t3h7',
        original_url: 'https://www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
      }),
    ).rejects.toEqual(new AppError('You already have this url registered'));
  });
});
