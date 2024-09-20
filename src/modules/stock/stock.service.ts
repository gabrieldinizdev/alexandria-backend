import { Injectable, NotFoundException } from '@nestjs/common';

import { Stock } from '@prisma/client';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dtos';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter } from '@/shared/types';

import { CreateOneStockDTO, UpdateOneStockByIdDTO } from './dtos';

@Injectable()
export class StockService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOne(dto: CreateOneStockDTO) {
    const { name } = dto;

    const data = await this.prismaService.stock.create({
      data: {
        name,
      },
    });
    return { data };
  }

  public async findAll({
    pagination: { page = 1, size = 5 },
  }: CommonFilter<Stock>) {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };
    const total = await this.prismaService.stock.count({
      where: filter,
    });

    page = +page;
    size = +size;

    const data = await this.prismaService.stock.findMany({
      skip: (page - 1) * size,
      take: size,
      where: filter,
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOneById(id: string) {
    const data = await this.prismaService.stock.findUnique({
      where: {
        id,
      },
    });
    if (!data) return new NotFoundException('Stock not found');

    return { data };
  }

  public async updateOneById(id: string, dto: UpdateOneStockByIdDTO) {
    const { name } = dto;

    const data = await this.prismaService.stock.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    if (!data) return new NotFoundException('Stock not found');

    return { data };
  }

  public async softDeleteOne(id: string) {
    const data = await this.prismaService.stock.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!data) return new NotFoundException('Stock not found');

    return { data };
  }
}
