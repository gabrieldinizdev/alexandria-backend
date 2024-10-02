import { Injectable, NotFoundException } from '@nestjs/common';

import { Department } from '@prisma/client';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dtos';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter, SelectModelFieldsType } from '@/shared/types';

import { CreateOneDepartmentDTO, UpdateOneDepartmentByIdDTO } from './dtos';

@Injectable()
export class DepartmentsService {
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
    fields,
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
      select: fields,
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOneById(
    id: string,
    fields?: SelectModelFieldsType<Department>,
  ) {
    const data = await this.prismaService.department.findUnique({
      where: {
        id,
      },
      select: fields,
    });

    if (!data) throw new NotFoundException('The department was not found.');

    return { data };
  }

  public async updateOne(id: string, dto: UpdateOneDepartmentByIdDTO) {
    const { name } = dto;

    await this.findOneById(id);

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
    await this.findOneById(id);

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
