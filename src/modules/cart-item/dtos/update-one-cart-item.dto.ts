import { OmitType, PartialType } from '@nestjs/swagger';

import { CartItemDTO } from './cart-item.dto';

export class UpdateOneCartItemByIdDTO extends PartialType(
  OmitType(CartItemDTO, ['id', 'price', 'createdAt', 'updatedAt', 'deletedAt']),
) {}
