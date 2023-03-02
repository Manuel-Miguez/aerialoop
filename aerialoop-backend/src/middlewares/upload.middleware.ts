import multer from 'multer';
import Environment from '../config/environment';
import { MimeType } from '../interfaces/types';

/**
 * **Middleware**
 *
 * Validates File Type of Request
 */
const validateFile = (mimeType: MimeType | null = null) => {
  return multer({
    dest: Environment.tmp.path,
    fileFilter: (_req, file, cb) => {
      if (!mimeType || file.mimetype === mimeType) {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error(`Invalid upload: mimeType must be ${mimeType}`));
      }
    },
  });
};
export default validateFile;
