import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CustomException } from './custom.exception';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse(); // 获取 response 对象
    const request = ctx.getRequest(); // 获取 request 对象
    const status = exception.getStatus(); // 获取异常的状态码

    //判断是否为自定义类
    if (exception instanceof CustomException) {
      response.status(status).json({
        statusCode: status,
        message: exception.getErrorMessage(),
        timestamp: new Date().toISOString(),
        path: request.url,
        test: '自定义异常',
      });
      return;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: '我是你自定义的异常',
    });
  }
}
