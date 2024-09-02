import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { CartDTO } from './cart.dto';

class DefaultCreatedCartDTO extends PickType(CartDTO, [
  'customerId',
] as const) {}

class NewCreateCartDTO extends PickType(CartDTO, ['customerId'] as const) {
  @IsNotEmpty()
  public readonly customerId: string;
}

export class CreateOneCartDTO extends IntersectionType(
  DefaultCreatedCartDTO,
  NewCreateCartDTO,
) {}
