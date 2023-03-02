import { Router } from 'express';
import csvRoutes from './csv.routes';

const router = Router();

router.use('/csv', csvRoutes);

export default router;
