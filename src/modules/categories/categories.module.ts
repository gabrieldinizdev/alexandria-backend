import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { DepartmentModule } from '../departments';
import { CategoryController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoriesService, PrismaService],
  imports: [DepartmentModule],
  exports: [CategoriesService],
})
export class CategoryModule {}
