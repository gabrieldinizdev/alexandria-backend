import { Injectable, NotFoundException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PaginationMetaDTO } from '@/shared/dto/pagination/pagination-meta.dto';
import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';
import { PaginationDTO } from '@/shared/dto/pagination/pagination.dto';
import { PrismaService } from '@/shared/prisma';

import { UpdateUserDTO } from './dtos';
import { CreateUserDTO } from './dtos/create-one-user.dto';

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
    pagination: { page = 1, size = 5 },
  }: {
    pagination: PaginationOptionsDTO;
  }) {
    const filter = {
      OR: [{ deletedAt: null }, { deletedAt: { isSet: false } }],
    };
    const total = await this.prismaService.user.count({
      where: filter,
    });

    page = +page;
    size = +size;

    const data = await this.prismaService.user.findMany({
      skip: (page - 1) * size,
      take: size,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      where: filter,
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
    if (!data) throw new NotFoundException('Usuário não encontrado.');
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

  public async updateOne(id: string, dto: UpdateUserDTO) {
    const { email, password, name } = dto;

    let hashedPassword = undefined;

    if (password) {
      hashedPassword = await this.hashPassword(password);
    }

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
