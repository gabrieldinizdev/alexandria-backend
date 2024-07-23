import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';

import { CreateDepartmentDTO, UpdateDepartmentDTO } from './dto';

@Injectable()
export class DepartmentService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOne(dto: CreateDepartmentDTO) {
    const { name } = dto;

    const data = await this.prismaService.department.create({
      data: {
        name,
      },
    });
    return { data };
  }

  public async findAll() {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };
    const data = await this.prismaService.department.findMany({
      where: filter,
    });

    return { data };
  }

  public async findOneById(id: string) {
    const data = await this.prismaService.department.findUnique({
      where: {
        id,
      },
    });
    return { data };
  }

  public async updateOne(dto: UpdateDepartmentDTO, id: string) {
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

  public async softDeleteOne(id: string) {
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
