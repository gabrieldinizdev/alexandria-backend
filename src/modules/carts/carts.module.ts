import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { CustomersModule } from '../customers';
import { CartController } from './carts.controller';
import { CartService } from './carts.service';

@Module({
  controllers: [CartController],
  providers: [CartService, PrismaService],
  imports: [CustomersModule],
  exports: [CartService],
})
export class CartModule {}
