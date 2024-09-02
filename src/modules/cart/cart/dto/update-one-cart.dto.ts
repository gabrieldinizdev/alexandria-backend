import { OmitType, PartialType } from '@nestjs/swagger';

import { CartDTO } from './cart.dto';

export class UpdateOneCartByIdDTO extends PartialType(
  OmitType(CartDTO, ['id', 'items', 'createdAt', 'updatedAt', 'deletedAt']),
) {}
