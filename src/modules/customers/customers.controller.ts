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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Customer } from '@prisma/client';

import { PaginationOptionsDTO, SelectFieldsDTO } from '@/shared/dtos';
import { AuthGuard } from '@/shared/guards';
import { SelectFieldsPipe } from '@/shared/pipes';
import {
  ConflictResponseDTO,
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
  UnauthorizedResponseDTO,
} from '@/shared/responses';
import { SelectModelFieldsType } from '@/shared/types';

import { CustomersService } from './customers.service';
import {
  CreateOneCustomerDTO,
  CustomerDTO,
  FindOneCustomerByEmailDTO,
  FindOneCustomerByIdDTO,
  UpdateOneCustomerByIdDTO,
} from './dtos';
import {
  CreatedOneCustomerResponseDTO,
  DeletedOneCustomerResponseDTO,
  FoundAllCustomerResponseDTO,
  FoundOneCustomerResponseDTO,
  UpdatedOneCustomerResponseDTO,
} from './responses';

@ApiBearerAuth()
@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  public constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({
    description: 'Create customer with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Customers response object created',
    type: CreatedOneCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized customers response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicting customers response object',
    type: ConflictResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @Post()
  public async createOne(@Body() createUserDTO: CreateOneCustomerDTO) {
    return await this.customersService.createOne(createUserDTO);
  }

  @ApiOperation({
    summary: 'Find All',
    description: 'This request find all customers',
  })
  @ApiResponse({
    description: 'Customers response objet ok',
    type: FoundAllCustomerResponseDTO,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized customers response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<CustomerDTO>,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Customer>,
  ) {
    return this.customersService.findAll({
      pagination,
      fields: select,
    });
  }

  @ApiOperation({
    description: 'Get customer by ID',
    summary: 'Find One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customers response object ok',
    type: FoundOneCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized customers response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found customers response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<CustomerDTO>,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOneById(
    @Param() { id }: FindOneCustomerByIdDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Customer>,
  ) {
    return await this.customersService.findOneById(id, select);
  }

  @ApiOperation({
    description: 'Get Customer by ID',
    summary: 'Find One By Email',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customers response object ok',
    type: FoundOneCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized customers response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found customers response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<CustomerDTO>,
  })
  @UseGuards(AuthGuard)
  @Get('email/:email')
  public async findOneByEmail(
    @Param() { email }: FindOneCustomerByEmailDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Customer>,
  ) {
    return this.customersService.findOneByEmail(email, select);
  }

  @ApiOperation({
    description: 'Update customer with required fields',
    summary: 'Update One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customers response object ok',
    type: UpdatedOneCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized customers response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found customers response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicting customers response object',
    type: ConflictResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  public async updateOneById(
    @Param() { id }: FindOneCustomerByIdDTO,
    @Body() updateUserDTO: UpdateOneCustomerByIdDTO,
  ) {
    return await this.customersService.updateOne(id, updateUserDTO);
  }

  @ApiOperation({
    description: 'Delete customer by ID',
    summary: 'Delete One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customers response object ok',
    type: DeletedOneCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized customers response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found customers response object',
    type: RecordNotFoundDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async softDeleteOne(@Param() { id }: FindOneCustomerByIdDTO) {
    return await this.customersService.softDeleteOne(id);
  }
}
