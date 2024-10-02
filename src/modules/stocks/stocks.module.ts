import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { StockController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  controllers: [StockController],
  providers: [StocksService, PrismaService],
  exports: [StocksService],
})
export class StockModule {}
