import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CustomersModule } from './customer/customer.module';
import { DepartmentModule } from './department/department.module';
import { ProductModule } from './product/product.module';
import { RedisModule } from './redis/redis.module';
import { StockModule } from './stock/stock.module';
import { CartModule } from './cart/cart/cart.module';
import { ItemModule } from './item/item/item.module';

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
