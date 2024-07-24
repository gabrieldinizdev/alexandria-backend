import { Injectable } from '@nestjs/common';

import {
  PaginationDTO,
  PaginationMetaDTO,
  PaginationOptionsDTO,
} from '@/shared/dto/pagination';
import { PrismaService } from '@/shared/prisma';

import { CreateOneCategoryDTO } from './dtos';
import { UpdateOneCategoryByIdDTO } from './dtos/update-one-category-by-id.dto';

@Injectable()
export class CategoryService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOne(dto: CreateOneCategoryDTO) {
    const { name, departmentId } = dto;

    const data = await this.prismaService.category.create({
      data: {
        name,
        departmentId,
      },
    });
    return { data };
  }

  public async findAll({
    pagination: { page = 1, size = 5 },
  }: {
    pagination: PaginationOptionsDTO;
  }) {
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
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOneById(id: string) {
    const data = await this.prismaService.category.findUnique({
      where: {
        id,
      },
    });
    return { data };
  }

  public async updateOneById(id: string, dto: UpdateOneCategoryByIdDTO) {
    const { name } = dto;
    const data = await this.prismaService.category.update({
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
