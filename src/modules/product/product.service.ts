import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '@prisma/client';

import {
  PaginationDTO,
  PaginationMetaDTO,
  PaginationOptionsDTO,
} from '@/shared/dto/pagination';
import { PrismaService } from '@/shared/prisma';
import { SelectModelFieldsType } from '@/shared/types';

import { CreateOneProductDTO, UpdateOneProductByIdDTO } from './dtos';

@Injectable()
export class ProductService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async createOne(dto: CreateOneProductDTO) {
    const { title, description, price, sku, active, categoryId } = dto;

    const data = await this.prismaService.product.create({
      data: {
        title,
        description,
        price,
        sku,
        active,
        categoryId,
      },
    });
    return { data };
  }

  public async findAll(
    {
      pagination: { page = 1, size = 5 },
    }: {
      pagination: PaginationOptionsDTO;
    },
    fields: SelectModelFieldsType<Product>,
  ) {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };
    const total = await this.prismaService.product.count({
      where: filter,
    });

    page = +page;
    size = +size;

    const data = await this.prismaService.product.findMany({
      skip: (page - 1) * size,
      take: size,
      select: fields,
      where: filter,
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOneById(id: string, fields: SelectModelFieldsType<Product>) {
    const data = await this.prismaService.product.findUnique({
      where: {
        id,
      },
      select: fields,
    });
    if (!data) throw new NotFoundException('Product not found.');

    return { data };
  }

  public async updateOneById(id: string, dto: UpdateOneProductByIdDTO) {
    const { active, categoryId, description, price, sku, title } = dto;

    const data = await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        active,
        categoryId,
        description,
        price,
        sku,
        title,
      },
    });

    if (!data) throw new NotFoundException('Product not found');

    return { data };
  }

  public async softDeleteOne(id: string) {
    const data = await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    if (!data) throw new NotFoundException('Product not found.');

    return { data };
  }

  public async linkProductToStock(
    productId: string,
    stockId: string,
    quantity: number,
  ) {
    const data = await this.prismaService.productsOnStocks.create({
      data: {
        quantity,
        product: {
          connect: { id: productId },
        },
        stock: {
          connect: { id: stockId },
        },
      },
    });

    return { data };
  }
}
