import { Injectable, NotFoundException } from '@nestjs/common';

import { Cart } from '@prisma/client';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dto/pagination';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter, SelectModelFieldsType } from '@/shared/types';

import { CreateOneCartDTO } from './dto/create-one-cart.dto';
import { UpdateOneCartByIdDTO } from './dto/update-one-cart.dto';

@Injectable()
export class CartService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOne(dto: CreateOneCartDTO) {
    const { customerId } = dto;

    const data = await this.prismaService.cart.create({
      data: {
        active: true,
        customerId,
      },
    });

    return {
      data,
    };
  }

  public async findAll({
    pagination: { page = 1, size = 5 },
    fields,
  }: CommonFilter<Cart>) {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };
    const total = await this.prismaService.cart.count({
      where: filter,
    });

    page = +page;
    size = +size;

    const data = await this.prismaService.cart.findMany({
      skip: (page - 1) * size,
      take: size,
      select: fields,
      where: filter,
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOneById(id: string, fields?: SelectModelFieldsType<Cart>) {
    const data = await this.prismaService.cart.findUnique({
      where: {
        id,
      },
      select: fields,
    });

    if (!data) throw new NotFoundException('Cart not found.');

    return {
      data,
    };
  }

  public async updateOneById(id: string, dto: UpdateOneCartByIdDTO) {
    const { active, total } = dto;

    const data = await this.prismaService.cart.update({
      data: {
        active,
        total,
      },
      where: {
        id,
      },
    });

    if (!data) throw new NotFoundException('Cart not found.');

    return {
      data,
    };
  }

  public async deleteOneById(id: string) {
    const data = await this.prismaService.cart.delete({
      where: {
        id,
      },
    });

    if (!data) throw new NotFoundException('Cart not found.');

    return {
      data,
    };
  }
}
