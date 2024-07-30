import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { CustomersController } from './customer.controller';
import { CustomersService } from './customer.service';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, PrismaService],
  exports: [CustomersService],
})
export class CustomersModule {}
