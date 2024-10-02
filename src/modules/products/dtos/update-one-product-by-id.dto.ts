import { OmitType, PartialType } from '@nestjs/swagger';

import { ProductDTO } from './product.dto';

export class UpdateOneProductByIdDTO extends PartialType(
  OmitType(ProductDTO, ['id', 'createdAt', 'deletedAt', 'updatedAt']),
) {}
