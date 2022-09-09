import { inject, injectable } from 'tsyringe';

import { getDate } from '../../../helpers/dateHelper';
import { IUrlsRepository } from '../interfaces/IUrlRepository';

@injectable()
class UrlCronJobs {
  constructor(
    @inject('UrlsRepository')
    private urlsRepository: IUrlsRepository,
  ) {}

  async startCronJob(): Promise<void> {
    const date = getDate();
    await this.urlsRepository.deleteInactiveUrls(date);
  }
}
export { UrlCronJobs };
