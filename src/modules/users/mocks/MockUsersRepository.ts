import { generate } from 'shortid';

import { User } from '../infra/database/entities/User';
import { ICreateUserDTO } from '../interfaces/ICreateUserDTO';
import { IUsersRepository } from '../interfaces/IUsersRepository';

class MockUsersRepo implements IUsersRepository {
  users: User[] = [];
  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: generate(),
      name,
      email,
      password,
      created_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id);
    return user;
  }
}

export { MockUsersRepo };
