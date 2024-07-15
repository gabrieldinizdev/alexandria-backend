import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/prisma';
import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';
import { CreateUserDTO } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  public constructor(private readonly prismaService: PrismaService) {}

  //   public findAll({
  //     pagination: { page, size } = {},
  //   }: {
  //     pagination: PaginationOptionsDTO;
  //   }) {

  //     const total = await this.userModel.countDocuments(query);

  //     this.prismaService.user.findMany({
  //       skip: page * size,
  //       take: size,
  //     },);

  //   }

  public create(dto: CreateUserDTO) {
    const { email, password, name } = dto;

    this.prismaService.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }
}
