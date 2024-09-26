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
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
  UnauthorizedResponseDTO,
} from '@/shared/responses';
import { SelectModelFieldsType } from '@/shared/types';

import { CustomersService } from './customer.service';
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
    description: 'Customer response object',
    type: CreatedOneCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Customer Unauthorized response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Customer Bad Request response Object',
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
    description: 'find all customer response',
    type: FoundAllCustomerResponseDTO,
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Category response object',
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
    description: 'Customer response object',
    type: FoundOneCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Category response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Category response object',
    type: RecordNotFoundDTO,
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Category response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Category response object',
    type: RecordNotFoundDTO,
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Category response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Category response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Update Response Bad Request Object',
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
    description: 'Customer response object',
    type: DeletedOneCustomerResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Category response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Category response object',
    type: RecordNotFoundDTO,
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  public async softDeleteOne(@Param() { id }: FindOneCustomerByIdDTO) {
    return await this.customersService.softDeleteOne(id);
  }
}
