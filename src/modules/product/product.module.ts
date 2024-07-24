import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
