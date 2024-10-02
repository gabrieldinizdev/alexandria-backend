import { Module } from '@nestjs/common';

import { RedisModule } from '@/shared/providers';

import { AuthModule } from './auth';
import { ItemModule } from './cart-items';
import { CartModule } from './carts';
import { CategoryModule } from './categories';
import { CustomersModule } from './customers';
import { DepartmentModule } from './departments';
import { ProductModule } from './products';
import { StockModule } from './stocks';

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
