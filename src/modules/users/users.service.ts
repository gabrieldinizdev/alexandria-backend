import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PaginationMetaDTO } from '@/shared/dto/pagination/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';
import { PaginationDTO } from '@/shared/dto/pagination/pagination.dto';
import { PrismaService } from '@/shared/prisma';

import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  public constructor(private readonly prismaService: PrismaService) {}

  private async hashPassword(password: string) {
    const rounds = 10;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

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
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });

    return {
      data,
    };
  }

  public async createOne(dto: CreateUserDTO) {
    const { email, password, name } = dto;

    const hashedPassword = await this.hashPassword(password);

    const data = await this.prismaService.user.create({
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

  public async updateOne(id: string, dto: CreateUserDTO) {
    const { email, password, name } = dto;

    const hashedPassword = await this.hashPassword(password);

    const data = await this.prismaService.user.update({
      where: {
        id,
      },
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

  public async softDeleteOne(id: string) {
    const data = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      data,
    };
  }
}
