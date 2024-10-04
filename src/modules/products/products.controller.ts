import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
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

import {
  CreateOneProductDTO,
  CreateOneProductOnStockDTO,
  FindOneProductByIdDTO,
  ProductDTO,
  UpdateOneProductByIdDTO,
} from './dtos';
import { ProductsService } from './products.service';
import {
  CreatedOneProductResponseDTO,
  CreatedProductOnStockResponseDTO,
  DeletedOneProductResponseDTO,
  FoundAllProductResponseDTO,
  UpdatedOneProductResponseDTO,
} from './responses';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductController {
  public constructor(private readonly productService: ProductsService) {}

  @ApiOperation({
    description: 'Create product with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Products response created',
    type: CreatedOneProductResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized products response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found products response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
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
    description: 'Products response object ok',
    type: FoundAllProductResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized products response object',
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
    return this.productService.findAll({
      pagination,
      fields: select,
    });
  }

  @ApiOperation({
    description: 'Find one by id with required fields',
    summary: 'Find one by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Products response object ok',
    type: FoundAllProductResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized products response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found products response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @ApiQuery({
    name: 'select',
    type: SelectFieldsDTO<ProductDTO>,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  public async findOneById(
    @Param() { id }: FindOneProductByIdDTO,
    @Query('select', new SelectFieldsPipe())
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
    description: 'Products response object ok',
    type: UpdatedOneProductResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized products response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found products response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
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
    description: 'Products response object ok',
    type: DeletedOneProductResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized products response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found products response object',
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
    status: HttpStatus.OK,
    description: 'productsOnStock response object ok',
    type: CreatedProductOnStockResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized productsOnStock response object',
    type: UnauthorizedResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Record not found productsOnStock response object',
    type: RecordNotFoundDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflicting productsOnStock response object',
    type: ConflictResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid entries response object',
    type: InvalidEntriesResponseDTO,
  })
  @UseGuards(AuthGuard)
  @Put(':productId/stocks/:stockId')
  public async linkProductToStock(
    @Param('productId') productId: string,
    @Param('stockId') stockId: string,
    @Body() { quantity }: CreateOneProductOnStockDTO,
  ) {
    return this.productService.linkProductToStock(productId, stockId, quantity);
  }
}
