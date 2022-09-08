import { container } from 'tsyringe';

import { UrlsRepository } from '../../modules/urls/infra/database/repositories/UrlsRepository';
import { IUrlsRepository } from '../../modules/urls/interfaces/IUrlRepository';
import { UsersRepository } from '../../modules/users/infra/database/repositories/UsersRepositories';
import { IUsersRepository } from '../../modules/users/interfaces/IUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUrlsRepository>('UrlsRepository', UrlsRepository);
