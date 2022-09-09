import { generate } from 'shortid';

import { MockUrlsRepository } from '../../mocks/MockUrlRepository';
import { GetUserUrlsUseCase } from './GetUserUrlsUseCase';

let mockUrlsRepo: MockUrlsRepository;
let getUserUrlsUseCase: GetUserUrlsUseCase;

describe('List user urls', () => {
  beforeEach(() => {
    mockUrlsRepo = new MockUrlsRepository();
    getUserUrlsUseCase = new GetUserUrlsUseCase(mockUrlsRepo);
  });

  it('Should be list all user urls', async () => {
    await mockUrlsRepo.create({
      hash: generate(),
      original_url: 'https://www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
      user_id: 'u5e71',
      short_url: 'http://localhost:3333/urls/hash1',
      clicks: 0,
    });

    await mockUrlsRepo.create({
      hash: generate(),
      original_url: 'https://www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
      user_id: 'u5e71',
      short_url: 'http://localhost:3333/urls/hash2',
      clicks: 0,
    });

    await mockUrlsRepo.create({
      hash: generate(),
      original_url: 'https://www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
      user_id: 'u5e781',
      short_url: 'http://localhost:3333/urls/hash3',
      clicks: 0,
    });

    await mockUrlsRepo.create({
      hash: generate(),
      original_url: 'https://www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
      user_id: 'u5e781',
      short_url: 'http://localhost:3333/urls/hash4',
      clicks: 0,
    });

    await mockUrlsRepo.create({
      hash: generate(),
      original_url: 'https://www.youtube.com/watch?v=Jnooy3EALRo&t=20s',
      user_id: 'u5e71',
      short_url: 'http://localhost:3333/urls/hash5',
      clicks: 0,
    });

    const userUrls = await getUserUrlsUseCase.execute('u5e71');

    expect(userUrls.length).toEqual(3);
    expect(userUrls[0]).toHaveProperty('id');
    expect(userUrls[2]).toHaveProperty('hash');
    expect(userUrls[2]).toHaveProperty('short_url');
  });
});
