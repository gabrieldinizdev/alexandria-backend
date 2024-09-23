import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';

@Module({
  controllers: [CartItemController],
  providers: [CartItemService, PrismaService],
})
export class ItemModule {}
