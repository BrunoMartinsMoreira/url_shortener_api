import { Router } from 'express';

import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated.middleware';
import { CreateUrlController } from '../../../useCases/createUrl/CreateUrlController';
import { RedirectUrlController } from '../../../useCases/redirectUrl/RedirectUrlController';

const createUrlController = new CreateUrlController();
const redirectUrlController = new RedirectUrlController();

const urlsRoutes = Router();

urlsRoutes.post('/', ensureAuthenticated, createUrlController.handle);
urlsRoutes.get('/:hash', redirectUrlController.handle);

export { urlsRoutes };
