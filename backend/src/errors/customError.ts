import { HTTP_SATUS_CODE } from "@/contracts/enums/main.js";
import { ICustomizedErrors } from "@/contracts/types/backend/errors/main.js";


export class CustomError extends Error {
  public statusCode: number;
  public errorCode: number;

  constructor(customError: ICustomizedErrors, statusCode: HTTP_SATUS_CODE = 400) {
    super(customError.message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = customError.code;

    Error.captureStackTrace(this, this.constructor);
  }

}