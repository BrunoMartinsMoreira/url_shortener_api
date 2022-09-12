import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IUsersRepository } from '../../interfaces/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    id: string;
    name: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const { JWT_SECRET_KEY, TOKEN_EXPIRATION } = process.env;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorret email or password', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Incorret email or password', 401);
    }

    const token = sign({}, String(JWT_SECRET_KEY), {
      subject: user.id,
      expiresIn: String(TOKEN_EXPIRATION),
    });

    return {
      user: {
        id: user.id,
        name: user.name,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
