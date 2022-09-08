import { Router } from 'express';

import { AuthenticateUserController } from '../../../useCases/authenticateUser/AuthenticateUserController';
import { CreateUserController } from '../../../useCases/createUser/CreateUserController';

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

const usersRoutes = Router();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/auth', authenticateUserController.handle);

export { usersRoutes };
