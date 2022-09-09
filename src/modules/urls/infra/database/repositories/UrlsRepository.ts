import { getRepository, Repository } from 'typeorm';

import { ICreateUrlDTO } from '../../../interfaces/ICreateUrlDTO';
import { IUrlsRepository } from '../../../interfaces/IUrlRepository';
import { Url } from '../entities/Url';

class UrlsRepository implements IUrlsRepository {
  private repository: Repository<Url>;

  constructor() {
    this.repository = getRepository(Url);
  }

  async create({
    original_url,
    hash,
    user_id,
    short_url,
    clicks = 0,
  }: ICreateUrlDTO): Promise<Url> {
    const url = this.repository.create({
      original_url,
      hash,
      user_id,
      short_url,
      clicks,
    });

    await this.repository.save(url);
    return url;
  }

  async findByUserId(user_id: string): Promise<Url[]> {
    const urls = await this.repository.find({ where: { user_id } });
    return urls;
  }

  async updateLasClickDateAndInCrementeClicks(
    id: string,
    newClicksValue: number,
    date: string,
  ): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ clicks: newClicksValue, last_click_date: date })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }

  async findByHash(hash: string): Promise<Url> {
    const url = await this.repository.findOne({
      where: {
        hash,
      },
    });
    return url;
  }

  async findByOriginalUrlAndUserId(
    original_url: string,
    user_id: string,
  ): Promise<Url> {
    const url = await this.repository.findOne({
      where: {
        original_url,
        user_id,
      },
    });
    return url;
  }

  async deleteInactiveUrls(date: string): Promise<void> {
    await this.repository.query(`
      DELETE FROM urls u
        WHERE 
          (
            DATE_PART('month', '${date}'::date) - 
            DATE_PART('month', u.last_click_date::date
          )) >= 3
    `);
  }
}

export { UrlsRepository };
