import { ICreateUrlDTO } from '../../../interfaces/ICreateUrlDTO';
import { IUrlsRepository } from '../../../interfaces/IUrlRepository';
import { Url } from '../entities/Url';

class UrlsRepository implements IUrlsRepository {
  create(data: ICreateUrlDTO): Promise<Url> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<Url> {
    throw new Error('Method not implemented.');
  }
  findByName(name: string): Promise<Url> {
    throw new Error('Method not implemented.');
  }
  incrementClick(url: Url): Promise<Url> {
    throw new Error('Method not implemented.');
  }
}

export { UrlsRepository };
