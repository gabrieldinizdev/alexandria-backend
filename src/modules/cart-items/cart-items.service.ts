import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { CartItem } from '@prisma/client';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dtos';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter, SelectModelFieldsType } from '@/shared/types';

import { CartService } from '../carts/carts.service';
import { ProductsService } from '../products/products.service';
import { CreateOneCartItemDTO, UpdateOneCartItemByIdDTO } from './dtos';

@Injectable()
export class CartItemsService {
  private readonly logger = new Logger(CartItemsService.name);

  public constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductsService,
    private readonly cartsService: CartService,
  ) {}

  public async createOne(dto: CreateOneCartItemDTO) {
    const { cartId, productId, quantity } = dto;

    await this.productService.findOneById(productId);
    await this.cartsService.findOneById(cartId);

    const product = (await this.productService.findOneById(productId)).data;

    const price = product.price * quantity;

    try {
      const data = await this.prismaService.cartItem.create({
        data: {
          price,
          quantity,
          productId,
          cartId,
        },
      });

      return { data };
    } catch (error) {
      throw new ConflictException('This product already exists in the cart');
    }
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

    if (!data) throw new NotFoundException('The cart item was not found.');

    return {
      data,
    };
  }

  public async updateOneById(id: string, dto: UpdateOneCartItemByIdDTO) {
    const { quantity } = dto;

    const cartItem = (await this.findOneById(id)).data;

    await this.productService.findOneById(cartItem.productId);
    await this.cartsService.findOneById(cartItem.cartId);

    const price = await this.calculateItemPrice(cartItem.productId, quantity);

    const data = await this.prismaService.cartItem.update({
      data: {
        quantity,
        price,
      },
      where: {
        id,
      },
    });

    return {
      data,
    };
  }

  public async deleteOneById(id: string) {
    await this.findOneById(id);

    const data = await this.prismaService.cartItem.delete({
      where: {
        id,
      },
    });

    return {
      data,
    };
  }

  public async calculateItemPrice(productId: string, quantity: number) {
    const product = (await this.productService.findOneById(productId)).data;

    const newPrice = product.price * quantity;
    return newPrice;
  }
}
