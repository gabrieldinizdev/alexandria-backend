import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ItemDTO } from './item.dto';

class DefaultCreatedItemDTO extends PickType(ItemDTO, ['cartId'] as const) {}

class NewCreateItemDTO extends PickType(ItemDTO, [
  'cartId',
  'productId',
  'quantity',
] as const) {
  @IsNotEmpty()
  public readonly cartId: string;

  @IsNotEmpty()
  public readonly productId: string;

  @IsNotEmpty()
  public readonly quantity: number;
}

export class CreateOneItemDTO extends IntersectionType(
  DefaultCreatedItemDTO,
  NewCreateItemDTO,
) {}
