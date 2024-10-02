import { PickType } from '@nestjs/swagger';

import { ProductDTO } from './product.dto';

export class FindOneProductByIdDTO extends PickType(ProductDTO, [
  'id',
] as const) {}
