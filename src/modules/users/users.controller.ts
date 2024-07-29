import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';
import { HttpExceptionFilter } from '@/shared/filters/http-exception';
import { SelectFieldsPipe } from '@/shared/pipes/select-fields/select-fields.pipe';
import { SelectModelFieldsType } from '@/shared/types';

import { AuthGuard } from '../auth/auth.guard';
import {
  CreateUserDTO,
  FindOneUserByEmailDTO,
  SelectUserFieldsDTO,
  UpdateUserDTO,
} from './dtos';
import { FindOneUserByIdDTO } from './dtos/find-one-user-by-id.dto';
import {
  CreatedOneUserResponseDTO,
  DeletedOneUserResponseDTO,
  FoundAllUserResponseDTO,
  FoundOneUserResponseDTO,
  UpdatedOneUserResponseDTO,
} from './responses';
import { UsersService } from './users.service';

@UseFilters(new HttpExceptionFilter())
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
  @UseGuards(AuthGuard)
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
  public async findOneById(
    @Param() { id }: FindOneUserByIdDTO,
    // @Query() { select }: SelectUserFieldsDTO,
  ) {
    return await this.usersService.findOneById(id);
  }

  @ApiOperation({
    description: 'Get User by ID',
    summary: 'Find One By Email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User response object',
    type: FoundOneUserResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectUserFieldsDTO,
  })
  @Get('email/:email')
  public async findOneByEmail(
    @Param() { email }: FindOneUserByEmailDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<User>,
  ) {
    return this.usersService.findOneByEmail(email, select);
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
    @Param() { id }: FindOneUserByIdDTO,
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
  public async delete(@Param() { id }: FindOneUserByIdDTO) {
    return await this.usersService.softDeleteOne(id);
  }
}
