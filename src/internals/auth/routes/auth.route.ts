import { Router } from 'express';

import * as AuthController from '@root/internals/auth/controllers/auth.controller';

const router = Router();

router.post('/signup', AuthController.signup);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

export default router;
