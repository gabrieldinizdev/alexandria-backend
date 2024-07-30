import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { StockController } from './stock.controller';
import { StockService } from './stock.service';

@Module({
  controllers: [StockController],
  providers: [StockService, PrismaService],
})
export class StockModule {}
