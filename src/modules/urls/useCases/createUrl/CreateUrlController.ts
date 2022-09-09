import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUrlUseCase } from './CreateUrlUseCase';

class CreateUrlController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createUrlUseCase = container.resolve(CreateUrlUseCase);

    const { id } = req.user;
    const { original_url } = req.body;

    const url = await createUrlUseCase.execute({ original_url, user_id: id });

    return res.status(200).json({
      url,
      message:
        'Shortened urls that remain idle for 3 months or more, ie without clicks, will be automatically deleted!',
    });
  }
}

export { CreateUrlController };
