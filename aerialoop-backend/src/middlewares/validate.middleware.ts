import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { JoiObject } from '../interfaces/joi.interface';
import { ApiError } from '../utils/response/error.utils';
import HttpStatus from 'http-status-codes';
import pick from '../utils/pick.utils';

/**
 * **Middleware**
 *
 * Validate data from request with a Joi Schema
 * @param schema Request's Joi Schema
 */
const validate = (schema: JoiObject) => (req: Request, _res: Response, next: NextFunction) => {
  const validSchema = pick(schema, ['params', 'query', 'body', 'file', 'files']);
  const object = pick(req, Object.keys(validSchema));
  const stripUnknown: boolean = object && !(object.file || object.files);
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object, { stripUnknown });
  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');

    next(new ApiError(HttpStatus.BAD_GATEWAY, 'General', errorMessage).JSON);
  }
  Object.assign(req, value);
  return next();
};

export default validate;
