import { Injectable, NotFoundException } from '@nestjs/common';

import { Department } from '@prisma/client';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dto/pagination';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter } from '@/shared/types';

import { CreateOneDepartmentDTO, UpdateOneDepartmentByIdDTO } from './dto';

@Injectable()
export class DepartmentService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOne(dto: CreateOneDepartmentDTO) {
    const { name } = dto;

    const data = await this.prismaService.department.create({
      data: {
        name,
      },
    });
    return { data };
  }

  public async findAll({
    pagination: { page = 1, size = 5 },
  }: CommonFilter<Department>) {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };
    const total = await this.prismaService.department.count({
      where: filter,
    });

    page = +page;
    size = +size;

    const data = await this.prismaService.department.findMany({
      skip: (page - 1) * size,
      take: size,
      where: filter,
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOneById(id: string) {
    const data = await this.prismaService.department.findUnique({
      where: {
        id,
      },
    });

    if (!data) return new NotFoundException('Department not found');

    return { data };
  }

  public async updateOne(dto: UpdateOneDepartmentByIdDTO, id: string) {
    const { name } = dto;

    const data = await this.prismaService.department.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    if (!data) return new NotFoundException('Department not found');

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

    if (!data) return new NotFoundException('Department not found');

    return { data };
  }
}
