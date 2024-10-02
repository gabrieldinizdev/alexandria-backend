import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { ErrorResponse } from '@/shared/types';
import { getPrismaKnownExceptionStatus } from '@/shared/utils';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  private readonly logger: Logger = new Logger(HttpExceptionFilter.name);

  public catch(exception: T, host: ArgumentsHost): ErrorResponse {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();
    const path = request.url;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let meta: Record<string, unknown> = {};

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = (exception.getResponse() as Record<string, unknown>)
        .message as string;
      meta = exception.cause as Record<string, unknown>;
    }
    // * Exception if the query engine returns a known error related to the request
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      statusCode = getPrismaKnownExceptionStatus(exception);
      message = `[${exception.code}]: ${exception.name}`;
      meta = exception.meta;
    }
    // * Exception if the query engine returns an error related to a request that does not have an error code
    else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      message = exception.message;
    }
    // * Exception if the underlying engine crashes and exits with a non-zero exit code
    else if (exception instanceof Prisma.PrismaClientRustPanicError) {
      message = exception.message;
    }
    // * Exception if something goes wrong when the query engine is started and the connection to the database is created.
    else if (exception instanceof Prisma.PrismaClientInitializationError) {
      message = exception.message;
    }
    // * Exception if validation fails
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      statusCode = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    this.logger.error(`[${request.method}]: ${path} ${statusCode}`);

    return response.status(statusCode).json({
      error: {
        statusCode,
        message,
        meta,
      },
    });
  }
}
