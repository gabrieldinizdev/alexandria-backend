import { Injectable, NotFoundException } from '@nestjs/common';

import { Item } from '@prisma/client';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dtos/pagination';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter, SelectModelFieldsType } from '@/shared/types';

import { CreateOneItemDTO, UpdateOneItemByIdDTO } from './dtos';

@Injectable()
export class ItemService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOne(dto: CreateOneItemDTO) {
    const { cartId, productId, quantity } = dto;

    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    const price = product.price * quantity;

    const data = await this.prismaService.item.create({
      data: {
        price,
        quantity,
        productId,
        cartId,
      },
    });

    return { data };
  }

  public async findAll({
    pagination: { page = 1, size = 5 },
    fields,
  }: CommonFilter<Item>) {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };

    const total = await this.prismaService.item.count({
      where: filter,
    });

    page = +page;
    size = +size;

    const data = await this.prismaService.item.findMany({
      skip: (page - 1) * size,
      take: size,
      select: fields,
      where: filter,
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOneById(id: string, fields?: SelectModelFieldsType<Item>) {
    const data = await this.prismaService.item.findUnique({
      where: {
        id,
      },
      select: fields,
    });

    if (!data) throw new NotFoundException('Item not found.');

    return {
      data,
    };
  }

  public async updateOneById(id: string, dto: UpdateOneItemByIdDTO) {
    const { cartId, quantity } = dto;

    const data = await this.prismaService.item.update({
      data: {
        quantity,
      },
      where: {
        id,
        cartId,
      },
    });

    if (!data) throw new NotFoundException('Item not found.');

    return {
      data,
    };
  }

  public async deleteOneById(id: string) {
    const data = await this.prismaService.item.delete({
      where: {
        id,
      },
    });

    if (!data) throw new NotFoundException('Item not found.');

    return {
      data,
    };
  }
}
