import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma';

@Global()
@Module({
  providers: [PrismaService],
})
export class SharedModule {}
