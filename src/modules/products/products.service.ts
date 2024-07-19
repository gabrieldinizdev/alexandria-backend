import { Injectable } from '@nestjs/common';

import { PrismaService } from 'nestjs-prisma';

import { CreateProductDTO } from './dtos';

@Injectable()
export class ProductsService {
  constructor(public readonly prismaService: PrismaService) {}

  public async createOne(dto: CreateProductDTO) {
    const { description, title, imageUrl, active, price } = dto;

    const data = await this.prismaService.product.create({
      data: {
        title,
        description,
        imageUrl,
        active,
        price,
      },
    });

    return { data };
  }
}
