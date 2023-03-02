import { Request, Response } from 'express';
import { successResponse } from '../utils/response/success.utils';
import HttpStatus from 'http-status-codes';
import { ApiError } from '../utils/response/error.utils';
import { Descriptions } from '../config/descriptions';
import * as service from '../services/csv.service';

export const combineData = async (request: Request, response: Response) => {
  try {
    const result = await service.processCSVs(request.files as Express.Multer.File[]);
    successResponse(response, HttpStatus.ACCEPTED, {
      ok: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    const customError = new ApiError(HttpStatus.BAD_GATEWAY, 'General', Descriptions.general.error.processingFile);
    response.status(503).json(customError.JSON);
  }
};
