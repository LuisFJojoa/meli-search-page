import { CustomError } from '@/errors/customError.js';
import { Request, Response } from 'express';

const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      errorCode: err.errorCode,
      message: err.message,
    });
  }

  res.status(500).json({
    errorCode: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
  });
};

export default errorHandler;
