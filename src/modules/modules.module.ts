import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CustomersModule } from './customer/customer.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [CustomersModule, AuthModule, DepartmentModule, CategoryModule],
})
export class ModulesModule {}
