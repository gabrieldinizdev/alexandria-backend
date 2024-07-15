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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';

import { CreateUserDTO, UpdateUserDTO } from './dtos';
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
  @Get(':userId')
  public async findOne(@Param('userId') userId: string) {
    return await this.usersService.findOne(userId);
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
  @Patch(':userId')
  public async update(
    @Param('userId') userId: string,
    @Body() createUserDTO: UpdateUserDTO,
  ) {
    return await this.usersService.updateOne(userId, createUserDTO);
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
  @Delete(':userId')
  public async delete(@Param('userId') userId: string) {
    return await this.usersService.softDeleteOne(userId);
  }
}
