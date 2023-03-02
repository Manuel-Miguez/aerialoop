import { ObjectSchema, ArraySchema } from 'joi';

export interface JoiObject {
  body?: ObjectSchema;
  query?: ObjectSchema;
  file?: ObjectSchema;
  files?: ArraySchema;
}
