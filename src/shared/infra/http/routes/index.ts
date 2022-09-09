import { Router } from 'express';

import { urlsRoutes } from '../../../../modules/urls/infra/http/routes/urls.routes';
import { usersRoutes } from '../../../../modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/urls', urlsRoutes);

export { routes };
