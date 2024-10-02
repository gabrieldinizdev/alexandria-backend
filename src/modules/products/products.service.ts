import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { Product } from '@prisma/client';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dtos';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter, SelectModelFieldsType } from '@/shared/types';

import { CategoriesService } from '../categories';
import { StocksService } from '../stocks/stocks.service';
import { CreateOneProductDTO, UpdateOneProductByIdDTO } from './dtos';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly categoriesService: CategoriesService,
    private readonly stockService: StocksService,
  ) {}

  public async createOne(dto: CreateOneProductDTO) {
    const { title, description, price, sku, active, categoryId } = dto;

    await this.categoriesService.findOneById(categoryId);

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

  public async findAll({
    pagination: { page = 1, size = 5 },
    fields,
  }: CommonFilter<Product>) {
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

  public async findOneById(
    id: string,
    fields?: SelectModelFieldsType<Product>,
  ) {
    const data = await this.prismaService.product.findUnique({
      where: {
        id,
      },
      select: fields,
    });
    if (!data) throw new NotFoundException('The product was not found.');

    return { data };
  }

  public async updateOneById(id: string, dto: UpdateOneProductByIdDTO) {
    const { active, categoryId, description, price, sku, title } = dto;

    await this.categoriesService.findOneById(categoryId);
    await this.findOneById(id);

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

    return { data };
  }

  public async softDeleteOne(id: string) {
    await this.findOneById(id);

    const data = await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return { data };
  }

  public async linkProductToStock(
    productId: string,
    stockId: string,
    quantity: number,
  ) {
    await this.findOneById(productId);
    await this.stockService.findOneById(stockId);

    try {
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
    } catch (error) {
      throw new ConflictException('This product and stock are already linked');
    }
  }
}
