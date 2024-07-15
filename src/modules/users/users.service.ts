import { Injectable } from '@nestjs/common';

import { PaginationMetaDTO } from '@/shared/dto/pagination/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';
import { PaginationDTO } from '@/shared/dto/pagination/pagination.dto';
import { PrismaService } from '@/shared/prisma';

import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll({
    pagination: { page, size } = {},
  }: {
    pagination: PaginationOptionsDTO;
  }) {
    const total = await this.prismaService.user.count({
      where: {
        deletedAt: {
          not: null,
        },
      },
    });

    const data = await this.prismaService.user.findMany({
      skip: page * size,
      take: size,
      select: {
        password: false,
      },
    });

    const meta = new PaginationMetaDTO({ page, size, total });

    const pagination = new PaginationDTO(data, meta);

    return pagination;
  }

  public async findOne(id: string) {
    const data = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        password: false,
      },
    });

    return {
      data,
    };
  }

  public async create(dto: CreateUserDTO) {
    const { email, password, name } = dto;

    const data = await this.prismaService.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return {
      data,
    };
  }

  public async update(id: string, dto: CreateUserDTO) {
    const { email, password, name } = dto;

    const data = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email,
        password,
        name,
      },
    });

    return {
      data,
    };
  }

  public async delete(id: string) {
    const data = await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return {
      data,
    };
  }
}
