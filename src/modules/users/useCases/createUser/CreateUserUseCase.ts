import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { ICreateUserDTO } from '../../interfaces/ICreateUserDTO';
import { IUsersRepository } from '../../interfaces/IUsersRepository';

interface IResponse {
  id: string;
  email: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, password, email }: ICreateUserDTO): Promise<IResponse> {
    if (!name || !password || !email) {
      throw new AppError('Name, email and password are required!');
    }

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists');
    }

    const pwdHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: pwdHash,
      email,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }
}

export { CreateUserUseCase };
