import { Router } from 'express';

import { AuthenticateUserController } from '../../../useCases/authenticateUser/AuthenticateUserController';
import { ValidateTokenController } from '../../../useCases/authenticateUser/ValidateTokenController';
import { CreateUserController } from '../../../useCases/createUser/CreateUserController';

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const validateTokenController = new ValidateTokenController();

const usersRoutes = Router();

usersRoutes.post('/', createUserController.handle);
usersRoutes.post('/auth', authenticateUserController.handle);
usersRoutes.post('/validate-token', validateTokenController.handle);

export { usersRoutes };
