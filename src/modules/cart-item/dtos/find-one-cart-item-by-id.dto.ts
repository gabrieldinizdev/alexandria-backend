import { PickType } from '@nestjs/swagger';

import { CartItemDTO } from './cart-item.dto';

export class FindOneCartItemByIdDTO extends PickType(CartItemDTO, [
  'id',
] as const) {}
