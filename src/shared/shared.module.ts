import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma';
import { PrismaErrorHandler } from './providers/prisma-error-handler/prisma-error-handler';

@Global()
@Module({
  providers: [PrismaService, PrismaErrorHandler],
})
export class SharedModule {}
