import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { CategoryModule } from '../categories';
import { StockModule } from '../stocks';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductController],
  imports: [CategoryModule, StockModule],
  providers: [ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductModule {}
