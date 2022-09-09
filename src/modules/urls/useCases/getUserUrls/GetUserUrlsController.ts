import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserUrlsUseCase } from './GetUserUrlsUseCase';

class GetUserUrlsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const getUserUrlsUseCase = container.resolve(GetUserUrlsUseCase);

    const urls = await getUserUrlsUseCase.execute(id);
    return res.status(200).json(urls);
  }
}

export { GetUserUrlsController };
