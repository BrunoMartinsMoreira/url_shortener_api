import { inject, injectable } from 'tsyringe';

import { IUrlsRepository } from '../../interfaces/IUrlRepository';

interface IResponse {
  id: string;
  original_url: string;
  user_id: string;
  shortUrl?: string;
  hash: string;
  created_at: Date;
  clicks: number;
  last_click_date: Date;
}

@injectable()
class GetUserUrlsUseCase {
  constructor(
    @inject('UrlsRepository')
    private urlsRepository: IUrlsRepository,
  ) {}

  async execute(user_id: string): Promise<IResponse[]> {
    const urls = await this.urlsRepository.findByUserId(user_id);
    return urls;
  }
}

export { GetUserUrlsUseCase };
