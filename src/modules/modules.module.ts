import { Module } from '@nestjs/common';

import { RedisModule } from '@/shared/providers';

import { AuthModule } from './auth';
import { CartModule } from './cart';
import { ItemModule } from './cart-item';
import { CategoryModule } from './category';
import { CustomersModule } from './customer';
import { DepartmentModule } from './department';
import { ProductModule } from './product';
import { StockModule } from './stock';

@Module({
  imports: [
    CustomersModule,
    AuthModule,
    DepartmentModule,
    CategoryModule,
    ProductModule,
    StockModule,
    RedisModule,
    CartModule,
    ItemModule,
  ],
})
export class ModulesModule {}
