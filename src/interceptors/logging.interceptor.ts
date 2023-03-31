import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { LoggerService } from 'core';
import { isNil } from 'lodash';
import moment from 'moment';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

/**
 * 로깅 인터 셉터이다.
 */
@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  private readonly loggerService: LoggerService = new LoggerService(HttpLoggingInterceptor.name);

  /**
   * 인터셉트
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    this.loggerService.log(
      `Request - HTTP Method: [START - ${request.method}] Request URL: ${(request as any).originalUrl} Time: ${moment().format(
        'YYYY년 MM월 DD일  HH시mm분ss초',
      )}`,
    );

    return next.handle().pipe(
      catchError((error: any) =>
        throwError(() => {
          if (!isNil(error?.response)) {
            const msg = `Code: ${error.response.code} Message: ${error.response.message}`;

            this.loggerService.error(
              `Error: HTTP Method - [ERROR - ${request.method}] Request URL: ${(request as any).originalUrl} Time: ${moment().format(
                'YYYY년 MM월 DD일  HH시mm분ss초',
              )} ${msg}`,
              {
                trace: error.stack,
                args: error.response.msgArgs,
              },
            );
          } else {
            this.loggerService.error(error, {
              trace: error.stack,
            });
          }

          return {
            isWrite: true,
            error,
          };
        }),
      ),
      finalize(() => {
        this.loggerService.log(
          `Response - HTTP Method: [END - ${request.method}] Request URL: ${(request as any).originalUrl} Time: ${moment().format(
            'YYYY년 MM월 DD일  HH시mm분ss초',
          )}`,
        );
      }),
    );
  }
}
