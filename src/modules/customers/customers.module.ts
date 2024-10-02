import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService],
  exports: [CustomersService],
})
export class CustomersModule {}
