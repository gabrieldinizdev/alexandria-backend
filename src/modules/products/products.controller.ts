import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProductDTO } from './dtos';
import { ProductsService } from './products.service';
import { CreatedOneProductResponseDTO } from './responses';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({
    description: 'Create product with required fields',
    summary: 'Create One',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product response object',
    type: CreatedOneProductResponseDTO,
  })
  @Post()
  public createOne(@Body() createProductDTO: CreateProductDTO) {
    return this.productsService.createOne(createProductDTO);
  }
}
