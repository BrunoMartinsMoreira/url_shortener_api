import { generate } from 'shortid';

import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { MockUrlsRepository } from '../../mocks/MockUrlRepository';
import { RedirectUrlUseCase } from './RedirectUrlUseCase';

let mockUrlsRepo: MockUrlsRepository;
let redirectUseCase: RedirectUrlUseCase;

describe('Redirect url', () => {
  beforeEach(() => {
    mockUrlsRepo = new MockUrlsRepository();
    redirectUseCase = new RedirectUrlUseCase(mockUrlsRepo);
  });

  it('Should return original url and increment clicks', async () => {
    const url = await mockUrlsRepo.create({
      hash: generate(),
      original_url: 'https://www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
      user_id: 'u5e71',
      short_url: 'http://localhost:3333/urls/hash1',
      clicks: 0,
    });

    const redirectUrl = await redirectUseCase.execute(url.hash);
    const urlIncrementedClicks = await mockUrlsRepo.findByHash(url.hash);

    expect(redirectUrl).toHaveProperty('original_url');
    expect(redirectUrl.original_url).toEqual(url.original_url);
    expect(urlIncrementedClicks.last_click_date).toBeTruthy();
    expect(urlIncrementedClicks.clicks).toEqual(1);
  });

  it('Shold be throw error if hash is invalid', async () => {
    await expect(redirectUseCase.execute('invalid_hash')).rejects.toEqual(
      new AppError('Url expired'),
    );
  });
});
