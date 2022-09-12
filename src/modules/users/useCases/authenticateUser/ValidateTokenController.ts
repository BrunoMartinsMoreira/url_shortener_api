import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ValidateTokenUseCase } from './ValidateTokenUseCase';

class ValidateTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const validateTokenUseCase = container.resolve(ValidateTokenUseCase);
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ');

    const user = await validateTokenUseCase.execute(token);

    return res.status(200).json(user);
  }
}

export { ValidateTokenController };
