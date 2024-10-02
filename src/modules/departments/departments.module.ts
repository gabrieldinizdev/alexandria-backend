import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { DepartmentController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentsService, PrismaService],
  exports: [DepartmentsService],
})
export class DepartmentModule {}
