import { HttpException, HttpStatus } from '@nestjs/common';

export enum CustomErrorCode {
  USER_NOTEXIST = 10002, // 用户不存在
  USER_EXIST = 10003, //用户已存在
}
export class CustomException extends HttpException {
  private errorMessage: string;
  private errorCode: CustomErrorCode;

  constructor(
    errorMessage: string,
    errorCode: CustomErrorCode,
    statusCode: HttpStatus = HttpStatus.OK,
  ) {
    super(errorMessage, statusCode);
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): CustomErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
