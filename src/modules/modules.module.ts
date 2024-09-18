import { Module } from '@nestjs/common';

import { RedisModule } from '@/shared/providers/cache/redis/redis.module';

import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { CustomersModule } from './customer/customer.module';
import { DepartmentModule } from './department/department.module';
import { ItemModule } from './item/item.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';

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
