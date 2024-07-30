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

import { Product } from '@prisma/client';

import { PaginationOptionsDTO } from '@/shared/dto/pagination';
import { SelectFieldsPipe } from '@/shared/pipes/select-fields/select-fields.pipe';
import {
  InvalidEntriesResponseDTO,
  RecordNotFoundDTO,
  UnauthorizedResponseDTO,
} from '@/shared/responses/common';
import { SelectModelFieldsType } from '@/shared/types';

import { AuthGuard } from '../auth/auth.guard';
import {
  CreateOneProductDTO,
  CreateOneProductOnStockDTO,
  FindOneProductByIdDTO,
  ProductDTO,
  SelectFieldsDTO,
  UpdateOneProductByIdDTO,
} from './dtos';
import { ProductService } from './product.service';
import {
  CreatedOneProductResponseDTO,
  CreatedProductOnStockResponseDTO,
  DeletedOneProductResponseDTO,
  FoundAllProductResponseDTO,
  UpdatedOneProductResponseDTO,
} from './responses';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('product')
export class ProductController {
  public constructor(private readonly productService: ProductService) {}

  @ApiOperation({
    description: 'Create product with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product response object',
    type: CreatedOneProductResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Category response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Login Response Bad Request Object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Post()
  public async createOne(@Body() createProductDTO: CreateOneProductDTO) {
    return this.productService.createOne(createProductDTO);
  }

  @ApiOperation({
    description: 'Find All with required fields',
    summary: 'Find All',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product response object',
    type: FoundAllProductResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Category response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<ProductDTO>,
  })
  @UseGuards(AuthGuard)
  @Get()
  public async findAll(
    @Query() pagination: PaginationOptionsDTO,
    @Query('select', new SelectFieldsPipe())
    select: SelectModelFieldsType<Product>,
  ) {
    return this.productService.findAll({ pagination }, select);
  }

  @ApiOperation({
    description: 'Find one by id with required fields',
    summary: 'Find one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product response object',
    type: FoundAllProductResponseDTO,
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
    type: SelectFieldsDTO<ProductDTO>,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOneById(
    @Param() { id }: FindOneProductByIdDTO,
    select: SelectModelFieldsType<Product>,
  ) {
    return this.productService.findOneById(id, select);
  }

  @ApiOperation({
    description: 'Update one by id with required fields',
    summary: 'Update one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product response object',
    type: UpdatedOneProductResponseDTO,
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
    description: 'Login Response Bad Request Object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  public async updateOneById(
    @Param() { id }: FindOneProductByIdDTO,
    @Body() updateOneProductByIdDTO: UpdateOneProductByIdDTO,
  ) {
    return this.productService.updateOneById(id, updateOneProductByIdDTO);
  }

  @ApiOperation({
    description: 'Delete product by ID',
    summary: 'Delete One',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product response object',
    type: DeletedOneProductResponseDTO,
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
  public async softDeleteOne(@Param() { id }: FindOneProductByIdDTO) {
    return this.productService.softDeleteOne(id);
  }

  @ApiOperation({
    description: 'Link product to stock with required fields',
    summary: 'Link one product to stock',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product to stock response object',
    type: CreatedProductOnStockResponseDTO,
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
    description: 'Login Response Bad Request Object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Post(':productId/stocks/:stockId')
  public async linkProductToStock(
    @Param('productId') productId: string,
    @Param('stockId') stockId: string,
    @Body() { quantity }: CreateOneProductOnStockDTO,
  ) {
    return this.productService.linkProductToStock(productId, stockId, quantity);
  }
}
