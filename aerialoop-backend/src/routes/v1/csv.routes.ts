import { Router } from 'express';
import * as controller from '../../controllers/csv.controller';
import validateFile from '../../middlewares/upload.middleware';
import validate from '../../middlewares/validate.middleware';
import { MimeType } from '../../interfaces/types';
import { combineDataValidator } from '../../validations/csv.validation';

const router = Router();

router.post('/upload', validateFile(MimeType.csv).any(), validate(combineDataValidator), controller.combineData);
export default router;
