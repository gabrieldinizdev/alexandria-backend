import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { UsersController } from './customer.controller';
import { CustomersService } from './customer.service';

@Module({
  controllers: [UsersController],
  providers: [CustomersService, PrismaService],
  exports: [CustomersService],
})
export class CustomersModule {}
