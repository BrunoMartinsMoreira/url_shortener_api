/* eslint-disable prefer-const */
import { inject, injectable } from 'tsyringe';

import { getDate } from '../../../../helpers/dateHelper';
import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IUrlsRepository } from '../../interfaces/IUrlRepository';

interface IResponse {
  original_url: string;
}

@injectable()
class RedirectUrlUseCase {
  constructor(
    @inject('UrlsRepository')
    private urlsRepository: IUrlsRepository,
  ) {}

  async execute(hash: string): Promise<IResponse> {
    const url = await this.urlsRepository.findByHash(hash);

    if (!url) {
      throw new AppError('Url expired');
    }

    let { id, clicks } = url;

    clicks++;

    const date = getDate();

    await this.urlsRepository.updateLasClickDateAndInCrementeClicks(
      id,
      clicks,
      date,
    );

    return {
      original_url: url.original_url,
    };
  }
}

export { RedirectUrlUseCase };
