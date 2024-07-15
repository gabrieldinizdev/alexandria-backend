import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';

import { CreateUserDTO, UpdateUserDTO } from './dtos';
import {
  CreatedUserResponse,
  DeletedUserResponse,
  SearchedUserResponse,
  UpdatedUserResponse,
} from './responses';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  public findAll(@Query() pagination: PaginationOptionsDTO) {
    return this.usersService.findAll({ pagination });
  }

  @ApiOperation({
    description: 'Get User by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'User response object',
    type: SearchedUserResponse,
  })
  @Get(':userId')
  public async findOne(@Param('userId') userId: string) {
    return await this.usersService.findOne(userId);
  }

  @ApiOperation({
    description: 'Create User with required fields',
  })
  @ApiResponse({
    status: 200,
    description: 'User response object',
    type: CreatedUserResponse,
  })
  @Post()
  public async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.usersService.create(createUserDTO);
  }

  @ApiOperation({
    description: 'Update User with required fields',
  })
  @ApiResponse({
    status: 200,
    description: 'User response object',
    type: UpdatedUserResponse,
  })
  @Put(':userId')
  public async update(
    @Param('userId') userId: string,
    @Body() createUserDTO: UpdateUserDTO,
  ) {
    return await this.usersService.update(userId, createUserDTO);
  }

  @ApiOperation({
    description: 'Delete User by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'User response object',
    type: DeletedUserResponse,
  })
  @Delete(':userId')
  public async delete(@Param('userId') userId: string) {
    return await this.usersService.delete(userId);
  }
}
