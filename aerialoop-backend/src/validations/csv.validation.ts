import Joi from 'joi';
import { NameCSVs } from '../interfaces/csv.interface';
import { JoiObject } from '../interfaces/joi.interface';
import { validArchivesArray } from './custom.validation';

export const combineDataValidator: JoiObject = {
  files: Joi.array().custom(validArchivesArray('fieldname', Object.values(NameCSVs))),
};
