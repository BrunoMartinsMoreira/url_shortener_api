import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../../interfaces/ICreateUserDTO';
import { IUsersRepository } from '../../../interfaces/IUsersRepository';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await this.repository.save({ name, email, password });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}

export { UsersRepository };
