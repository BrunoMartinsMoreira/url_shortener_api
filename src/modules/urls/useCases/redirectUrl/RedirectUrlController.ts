import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RedirectUrlUseCase } from './RedirectUrlUseCase';

class RedirectUrlController {
  async handle(req: Request, res: Response): Promise<void> {
    const redirectUrlUseCase = container.resolve(RedirectUrlUseCase);
    const { hash } = req.params;

    const url = await redirectUrlUseCase.execute(hash);

    return res.status(308).redirect(url.original_url);
  }
}

export { RedirectUrlController };
