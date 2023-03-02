import { Request, Response, NextFunction } from 'express';

/**
 * **Middleware**
 *
 * Sets No Cache header in Response
 */
export const noCache = (_: Request, res: Response, next: NextFunction) => {
  res.setHeader('Expires', '0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
};
