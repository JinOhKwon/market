import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AppError } from 'common';
import { LoggerService } from 'core';
import { Response } from 'express';

interface CustomError {
  isWrite: boolean;
  err: Error;
}

/**
 * 글로벌 에러 필터이다.
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly loggerService: LoggerService = new LoggerService(GlobalExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    let message = '요청을 처리하던 중 예상하지 못한 오류가 발생했습니다. \n 관리자에게 문의해주세요.';
    let code = 'Unknown Code';
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let statusMessage = HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR];

    if (exception.isWrite) {
      // 미리 정의된 예외라면..
      if (exception.error instanceof HttpException && exception.isWrite) {
        statusCode = exception.error.getStatus();
        statusMessage = HttpStatus[statusCode];
        const errorData = exception.error.getResponse();

        if (!(typeof errorData === 'string')) {
          const iError = errorData as AppError;
          code = iError.code;
          message = iError.message;
        }
      }
    } else {
      this.loggerService.error(exception.message, {
        trace: exception.stack,
        args: {
          ...exception,
        }
      });
    }

    response.status(statusCode).json({
      error: {
        statusCode,
        statusMessage,
        message,
        code,
      },
    });
  }
}
