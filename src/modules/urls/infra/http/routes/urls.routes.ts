import { Router } from 'express';

import { ensureAuthenticated } from '../../../../../shared/infra/http/middlewares/ensureAuthenticated.middleware';
import { CreateUrlController } from '../../../useCases/createUrl/CreateUrlController';
import { GetUserUrlsController } from '../../../useCases/getUserUrls/GetUserUrlsController';
import { RedirectUrlController } from '../../../useCases/redirectUrl/RedirectUrlController';

const createUrlController = new CreateUrlController();
const redirectUrlController = new RedirectUrlController();
const getUserUrlsController = new GetUserUrlsController();

const urlsRoutes = Router();

urlsRoutes.post('/', ensureAuthenticated, createUrlController.handle);
urlsRoutes.get('/:hash', redirectUrlController.handle);
urlsRoutes.get('/', ensureAuthenticated, getUserUrlsController.handle);

export { urlsRoutes };
