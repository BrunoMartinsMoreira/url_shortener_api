import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/infra/http/errors/AppError';
import { IUsersRepository } from '../../interfaces/IUsersRepository';

interface IPayload {
  sub: string;
}

interface IResponse {
  id: string;
  name: string;
}

@injectable()
class ValidateTokenUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(token: string): Promise<IResponse> {
    const { sub: user_id } = verify(
      token,
      String(process.env.JWT_SECRET_KEY),
    ) as IPayload;

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Invalid token', 401);
    }

    return {
      id: user.id,
      name: user.name,
    };
  }
}

export { ValidateTokenUseCase };
