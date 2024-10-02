import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Category } from '@prisma/client';

import { DepartmentsService } from '@/modules/departments';
import { PaginationDTO, PaginationMetaDTO } from '@/shared/dtos';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter, SelectModelFieldsType } from '@/shared/types';

import { CreateOneCategoryDTO, UpdateOneCategoryByIdDTO } from './dtos';

@Injectable()
export class CategoriesService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly departmentService: DepartmentsService,
  ) {}

  public async createOne(dto: CreateOneCategoryDTO) {
    const { name, departmentId } = dto;

    await this.departmentService.findOneById(departmentId);

    try {
      const data = await this.prismaService.category.create({
        data: {
          name,
          departmentId,
        },
      });
      return { data };
    } catch (error) {
      throw new ConflictException(
        'This category has already been used in this department',
      );
    }
  }

  public async findAll({
    pagination: { page = 1, size = 5 },
    fields,
  }: CommonFilter<Category>) {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };
    const total = await this.prismaService.category.count({
      where: filter,
    });

    page = +page;
    size = +size;
    const data = await this.prismaService.category.findMany({
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
    fields?: SelectModelFieldsType<Category>,
  ) {
    const data = await this.prismaService.category.findUnique({
      where: {
        id,
      },
      select: fields,
    });

    if (!data) throw new NotFoundException('The category was not found');

    return { data };
  }

  public async updateOneById(id: string, dto: UpdateOneCategoryByIdDTO) {
    const { name, departmentId } = dto;

    await this.findOneById(id);
    await this.departmentService.findOneById(departmentId);

    try {
      const data = await this.prismaService.category.update({
        where: {
          id,
        },
        data: {
          name,
          departmentId,
        },
      });

      return { data };
    } catch (error) {
      throw new ConflictException(
        'This category has already been used in this department',
      );
    }
  }

  public async softDeleteOne(id: string) {
    await this.findOneById(id);

    const data = await this.prismaService.category.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return { data };
  }
}
