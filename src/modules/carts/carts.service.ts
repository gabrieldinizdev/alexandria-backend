import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Cart } from '@prisma/client';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dtos';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter, SelectModelFieldsType } from '@/shared/types';

import { CustomersService } from '../customers/customers.service';
import { CreateOneCartDTO, UpdateOneCartByIdDTO } from './dtos';

@Injectable()
export class CartService {
  public constructor(
    private readonly prismaService: PrismaService,
    private readonly customersService: CustomersService,
  ) {}

  public async createOne(dto: CreateOneCartDTO) {
    const { customerId } = dto;

    await this.customersService.findOneById(customerId);

    try {
      const data = await this.prismaService.cart.create({
        data: {
          active: true,
          customerId,
        },
        include: {
          items: true,
        },
      });

      return {
        data,
      };
    } catch (error) {
      throw new ConflictException(
        'There is already a cart linked to this customer',
      );
    }
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

    if (!data) throw new NotFoundException('The cart was not found.');

    return {
      data,
    };
  }

  public async updateOneById(id: string, dto: UpdateOneCartByIdDTO) {
    const { active, total } = dto;

    await this.findOneById(id);

    const data = await this.prismaService.cart.update({
      data: {
        active,
        total,
      },
      where: {
        id,
      },
      include: {
        items: true,
      },
    });

    return {
      data,
    };
  }

  public async deleteOneById(id: string) {
    await this.findOneById(id);

    const data = await this.prismaService.cart.delete({
      where: {
        id,
      },
    });

    return {
      data,
    };
  }
}
