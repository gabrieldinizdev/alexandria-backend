import { ValidationPipe, type INestApplication } from '@nestjs/common';

import { HttpExceptionFilter } from '@/shared/filters';

export function appConfiguration(app: INestApplication) {
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
}
