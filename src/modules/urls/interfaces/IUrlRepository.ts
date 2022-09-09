import { Url } from '../infra/database/entities/Url';
import { ICreateUrlDTO } from './ICreateUrlDTO';

interface IUrlsRepository {
  create(data: ICreateUrlDTO): Promise<Url>;

  findByUserId(user_id: string): Promise<Url[]>;

  findByHash(hash: string): Promise<string>;

  updateLasClickDateAndInCrementeClicks(
    id: string,
    newClicksValue: number,
    date: string,
  ): Promise<void>;

  findByOriginalUrlAndUserId(
    original_url: string,
    user_id: string,
  ): Promise<Url>;

  deleteInactiveUrls(date: string): Promise<void>;
}

export { IUrlsRepository };
