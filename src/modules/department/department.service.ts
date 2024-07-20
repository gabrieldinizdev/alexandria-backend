import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { CreateDepartmentDTO, UpdateDepartmentDTO } from './dto';

@Injectable()
export class DepartmentService {
  public constructor(private readonly prismaService: PrismaService) {}

  async createOne(dto: CreateDepartmentDTO) {
    const { name } = dto;

    const data = await this.prismaService.department.create({
      data: {
        name,
      },
    });
    return { data };
  }

  async findAll() {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };
    const data = await this.prismaService.department.findMany({
      where: filter,
    });

    return { data };
  }

  async updateOne(dto: UpdateDepartmentDTO, id: string) {
    const { name } = dto;

    const data = await this.prismaService.department.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    return { data };
  }

  async softDeleteOne(id: string) {
    const data = await this.prismaService.department.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return { data };
  }
}
