import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Patch,
  UseFilters,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';
import { PrismaClientExceptionFilter } from '@/shared/filters/prisma-client-exception/prisma-client-exception.filter';

import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { FindOneUserDTO } from './dtos/find-one-user.dto';
import {
  CreatedOneUserResponseDTO,
  DeletedOneUserResponseDTO,
  FoundAllUserResponseDTO,
  FoundOneUserResponseDTO,
  UpdatedOneUserResponseDTO,
} from './responses';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseFilters(PrismaClientExceptionFilter)
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Find All',
    description: 'This request find all users',
  })
  @ApiResponse({
    description: 'find all user response',
    type: FoundAllUserResponseDTO,
    status: HttpStatus.OK,
  })
  @Get()
  public async findAll(@Query() pagination: PaginationOptionsDTO) {
    return await this.usersService.findAll({ pagination });
  }

  @ApiOperation({
    description: 'Get User by ID',
    summary: 'Find One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User response object',
    type: FoundOneUserResponseDTO,
  })
  @Get(':id')
  public async findOne(@Param() { id }: FindOneUserDTO) {
    return await this.usersService.findOne(id);
  }

  @ApiOperation({
    description: 'Create User with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User response object',
    type: CreatedOneUserResponseDTO,
  })
  @Post()
  public async create(@Body() createUserDTO: CreateUserDTO) {
    return await this.usersService.createOne(createUserDTO);
  }

  @ApiOperation({
    description: 'Update User with required fields',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User response object',
    type: UpdatedOneUserResponseDTO,
  })
  @Patch(':id')
  public async update(
    @Param() { id }: FindOneUserDTO,
    @Body() updateUserDTO: UpdateUserDTO,
  ) {
    return await this.usersService.updateOne(id, updateUserDTO);
  }

  @ApiOperation({
    description: 'Delete User by ID',
    summary: 'Delete One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User response object',
    type: DeletedOneUserResponseDTO,
  })
  @Delete(':id')
  public async delete(@Param() { id }: FindOneUserDTO) {
    return await this.usersService.softDeleteOne(id);
  }
}
