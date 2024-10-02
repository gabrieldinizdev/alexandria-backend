import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { CartModule } from '../carts';
import { ProductModule } from '../products';
import { CartItemController } from './cart-items.controller';
import { CartItemsService } from './cart-items.service';

@Module({
  controllers: [CartItemController],
  providers: [CartItemsService, PrismaService],
  imports: [ProductModule, CartModule],
  exports: [CartItemsService],
})
export class ItemModule {}
