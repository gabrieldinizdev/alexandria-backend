import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Customer } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PaginationDTO, PaginationMetaDTO } from '@/shared/dtos';
import { PrismaService } from '@/shared/prisma';
import { CommonFilter, SelectModelFieldsType } from '@/shared/types';

import { CreateOneCustomerDTO, UpdateOneCustomerByIdDTO } from './dtos';

@Injectable()
export class CustomersService {
  public constructor(private readonly prismaService: PrismaService) {}

  private async hashPassword(password: string) {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  public async findAll({
    pagination: { page = 1, size = 5 },
    fields,
  }: CommonFilter<Customer>) {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };
    const total = await this.prismaService.customer.count({
      where: filter,
    });

    page = +page;
    size = +size;

    const data = await this.prismaService.customer.findMany({
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
    fields?: SelectModelFieldsType<Customer>,
  ) {
    const data = await this.prismaService.customer.findUnique({
      where: {
        id,
      },
      select: fields,
    });

    if (!data) throw new NotFoundException('Customer not found.');

    return {
      data,
    };
  }

  public async findOneByEmail(
    email: string,
    fields?: SelectModelFieldsType<Customer>,
  ) {
    const data = await this.prismaService.customer.findUnique({
      where: {
        email,
      },
      select: fields,
    });

    if (!data) throw new NotFoundException('customer not found.');

    return {
      data,
    };
  }

  public async createOne(dto: CreateOneCustomerDTO) {
    const { email, password, name } = dto;
    const hashedPassword = await this.hashPassword(password);

    const data = await this.prismaService.customer.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    return {
      data,
    };
  }

  public async updateOne(id: string, dto: UpdateOneCustomerByIdDTO) {
    const { email, password, name } = dto;

    let hashedPassword = undefined;

    if (password) {
      hashedPassword = await this.hashPassword(password);
    }

    const data = await this.prismaService.customer.update({
      where: {
        id,
      },
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    if (!data) throw new NotFoundException('Customer not found');

    return {
      data,
    };
  }

  public async softDeleteOne(id: string) {
    const data = await this.prismaService.customer.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    if (!data) throw new NotFoundException('Customer not found');

    return {
      data,
    };
  }

  public async verifyEmailExistence(
    email: string,
    fields?: SelectModelFieldsType<Customer>,
  ) {
    const data = await this.prismaService.customer.findUnique({
      where: {
        email,
      },
      select: fields,
    });

    if (data) throw new ConflictException('Email already exists');

    return {
      data,
    };
  }
}
