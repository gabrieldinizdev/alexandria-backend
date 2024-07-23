import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CustomersModule } from './customer/customer.module';
import { DepartmentModule } from './department/department.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    CustomersModule,
    AuthModule,
    DepartmentModule,
    CategoryModule,
    StockModule,
  ],
})
export class ModulesModule {}
