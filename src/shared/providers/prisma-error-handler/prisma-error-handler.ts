import { Provider } from '@nestjs/common';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';

import { PrismaClientExceptionFilter } from 'nestjs-prisma';

export const PrismaErrorHandler: Provider = {
  provide: APP_FILTER,
  useFactory: ({ httpAdapter }: HttpAdapterHost) => {
    return new PrismaClientExceptionFilter(httpAdapter);
  },
  inject: [HttpAdapterHost],
};
