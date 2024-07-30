import { Module } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaService],
})
export class DepartmentModule {}
