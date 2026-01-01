import { Router } from 'express';

import AuthRoutes from '@root/internals/auth/routes/auth.route';

const router = Router();

router.use('/auth', AuthRoutes);

export default router;
