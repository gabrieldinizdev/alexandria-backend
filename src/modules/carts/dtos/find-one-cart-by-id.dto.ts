import { PickType } from '@nestjs/swagger';

import { CartDTO } from './cart.dto';

export class FindOneCartByIdDTO extends PickType(CartDTO, ['id'] as const) {}
