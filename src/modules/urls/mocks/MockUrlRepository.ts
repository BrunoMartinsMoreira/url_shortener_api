import { generate } from 'shortid';

import { Url } from '../infra/database/entities/Url';
import { ICreateUrlDTO } from '../interfaces/ICreateUrlDTO';
import { IUrlsRepository } from '../interfaces/IUrlRepository';

class MockUrlsRepository implements IUrlsRepository {
  urls: Url[] = [];
  async create({
    hash,
    original_url,
    user_id,
    short_url,
    clicks,
  }: ICreateUrlDTO): Promise<Url> {
    const url = new Url();

    Object.assign(url, {
      id: generate(),
      original_url,
      hash,
      user_id,
      short_url,
      clicks,
      last_click_date: null,
      created_at: new Date(),
    });

    this.urls.push(url);

    return url;
  }

  async findByUserId(user_id: string): Promise<Url[]> {
    const urls = this.urls.filter(url => url.user_id === user_id);
    return urls;
  }

  async findByHash(hash: string): Promise<Url> {
    const url = this.urls.find(url => url.hash === hash);
    return url;
  }

  async updateLasClickDateAndInCrementeClicks(
    id: string,
    newClicksValue: number,
    date: string,
  ): Promise<void> {
    const url = this.urls.find(url => url.id === id);

    Object.assign(url, {
      clicks: newClicksValue,
      last_click_date: date,
    });

    this.urls.push(url);
  }

  async findByOriginalUrlAndUserId(
    original_url: string,
    user_id: string,
  ): Promise<Url> {
    const url = this.urls.find(
      url => url.original_url === original_url && url.user_id === user_id,
    );

    return url;
  }

  deleteInactiveUrls(date: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { MockUrlsRepository };
