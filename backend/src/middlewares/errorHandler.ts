import { HTTP_SATUS_CODE } from '@/contracts/enums/main.js';
import { CustomError } from '@/errors/customError.js';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      message: error.message,
      code: error.errorCode
    });
  } else {
    res.status(HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR).json({
      error: `Ocurrió un error inesperado: ${error}`,
      code: HTTP_SATUS_CODE.INTERNAL_SERVER_ERROR
    });
  }
};