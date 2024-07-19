import { IntersectionType, PickType } from '@nestjs/swagger';

import { ProductDTO } from './product.dto';

class DefaultCreatedProductDTO extends PickType(ProductDTO, [
  'title',
  'description',
  'imageUrl',
  'price',
  'active',
] as const) {}

class NewCreateProductDTO extends PickType(ProductDTO, [
  'title',
  'description',
  'imageUrl',
  'active',
  'price',
] as const) {}

export class CreateProductDTO extends IntersectionType(
  DefaultCreatedProductDTO,
  NewCreateProductDTO,
) {}
