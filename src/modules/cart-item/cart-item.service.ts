import { Injectable, NotFoundException } from '@nestjs/common';

import { CartItem } from '@prisma/client';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dtos';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter, SelectModelFieldsType } from '@/shared/types';

import { CreateOneCartItemDTO, UpdateOneCartItemByIdDTO } from './dtos';

@Injectable()
export class CartItemService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOne(dto: CreateOneCartItemDTO) {
    const { cartId, productId, quantity } = dto;

    const product = await this.prismaService.product.findUnique({
      where: {
        id: productId,
      },
    });

    const price = product.price * quantity;

    const data = await this.prismaService.cartItem.create({
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
  }: CommonFilter<CartItem>) {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };

    const total = await this.prismaService.cartItem.count({
      where: filter,
    });

    page = +page;
    size = +size;

    const data = await this.prismaService.cartItem.findMany({
      skip: (page - 1) * size,
      take: size,
      select: fields,
      where: filter,
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOneById(
    id: string,
    fields?: SelectModelFieldsType<CartItem>,
  ) {
    const data = await this.prismaService.cartItem.findUnique({
      where: {
        id,
      },
      select: fields,
    });

    if (!data) throw new NotFoundException('cartItem not found.');

    return {
      data,
    };
  }

  public async updateOneById(id: string, dto: UpdateOneCartItemByIdDTO) {
    const { cartId, quantity } = dto;

    const data = await this.prismaService.cartItem.update({
      data: {
        quantity,
      },
      where: {
        id,
        cartId,
      },
    });

    if (!data) throw new NotFoundException('cartItem not found.');

    return {
      data,
    };
  }

  public async deleteOneById(id: string) {
    const data = await this.prismaService.cartItem.delete({
      where: {
        id,
      },
    });

    if (!data) throw new NotFoundException('cartItem not found.');

    return {
      data,
    };
  }
}
