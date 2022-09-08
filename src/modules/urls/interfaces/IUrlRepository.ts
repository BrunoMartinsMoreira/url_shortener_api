import { Url } from '../infra/database/entities/Url';
import { ICreateUrlDTO } from './ICreateUrlDTO';

interface IUrlsRepository {
  create(data: ICreateUrlDTO): Promise<Url>;
  findById(id: string): Promise<Url>;
  findByName(name: string): Promise<Url>;
  incrementClick(url: Url): Promise<Url>;
}

export { IUrlsRepository };
