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

import { PaginationOptionsDTO } from '@/shared/dto/pagination/pagination-options.dto';
import { SelectFieldsPipe } from '@/shared/pipes/select-fields/select-fields.pipe';
import { SelectModelFieldsType } from '@/shared/types';

import { AuthGuard } from '../auth/auth.guard';
import { CustomersService } from './customer.service';
import {
  CreateOneCustomerDTO,
  CustomerDTO,
  FindOneCustomerByEmailDTO,
  SelectFieldsDTO,
  UpdateOneCustomerByIdDTO,
} from './dtos';
import { FindOneCustomerByIdDTO } from './dtos/find-one-customer-by-id.dto';
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
    description: 'Customer response object',
    type: CreatedOneCustomerResponseDTO,
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
    description: 'find all customer response',
    type: FoundAllCustomerResponseDTO,
    status: HttpStatus.OK,
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
    return this.customersService.findAll({ pagination }, select);
  }

  @ApiOperation({
    description: 'Get customer by ID',
    summary: 'Find One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Customer response object',
    type: FoundOneCustomerResponseDTO,
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
    description: 'Customer response object',
    type: FoundOneCustomerResponseDTO,
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
    description: 'Customer response object',
    type: UpdatedOneCustomerResponseDTO,
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
    description: 'Customer response object',
    type: DeletedOneCustomerResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async softDeleteOne(@Param() { id }: FindOneCustomerByIdDTO) {
    return await this.customersService.softDeleteOne(id);
  }
}
