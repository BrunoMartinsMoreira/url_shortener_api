import { generate } from 'shortid';
import { inject, injectable } from 'tsyringe';

import { validateUrl } from '../../../../helpers/validateUrl';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IUrlsRepository } from '../../interfaces/IUrlRepository';

interface IRequest {
  original_url: string;
  user_id: string;
}

interface IResponse {
  id: string;
  original_url: string;
  user_id: string;
  shortUrl: string;
  created_at: Date;
  last_click_date: Date;
}

@injectable()
class CreateUrlUseCase {
  constructor(
    @inject('UrlsRepository')
    private urlsRepository: IUrlsRepository,
  ) {}

  async execute({ original_url, user_id }: IRequest): Promise<IResponse> {
    const isValidUrl = validateUrl(original_url);

    if (!isValidUrl) {
      throw new AppError('Invalid url');
    }

    const { BASE_URL } = process.env;

    const urlAlreadyExists =
      await this.urlsRepository.findByOriginalUrlAndUserId(
        original_url,
        user_id,
      );

    if (urlAlreadyExists) {
      throw new AppError('You already have this url registered');
    }

    let hash = generate();
    let hashIsAlreadyInUse = await this.urlsRepository.findByHash(hash);

    if (hashIsAlreadyInUse) {
      while (hashIsAlreadyInUse) {
        const newHash = generate();
        hashIsAlreadyInUse = await this.urlsRepository.findByHash(newHash);
        if (!hashIsAlreadyInUse) hash = newHash;
      }
    }

    const shortUrl = BASE_URL
      ? `${String(BASE_URL)}/urls/${hash}`
      : `http://localhost:3333/urls/${hash}`;

    const url = await this.urlsRepository.create({
      original_url,
      user_id,
      hash,
      short_url: shortUrl,
    });

    return {
      id: url.id,
      original_url,
      user_id,
      shortUrl,
      created_at: url.created_at,
      last_click_date: url.last_click_date,
    };
  }
}

export { CreateUrlUseCase };
