import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const isBadRequest = status === 400;
    response
      .status(status)
      .json(isBadRequest ? exception.getResponse() :
        {
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: exception.message,

        });
  }
}
