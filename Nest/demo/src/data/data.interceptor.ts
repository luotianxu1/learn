import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { CustomException } from 'src/custom.exception';

@Injectable()
export class DataInterceptor implements NestInterceptor {
  // 在这里进行拦截，在请求到达之前
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const { method, url } = request;
    console.log(`[${method}] ${url} - Request received`);

    return next.handle().pipe(
      tap(() => {
        console.log(`[${method}] ${url} - Request sent`);
      }),
    );
  }
}
