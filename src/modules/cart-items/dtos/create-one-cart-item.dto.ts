import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { CartItemDTO } from './cart-item.dto';

class DefaultCreatedCartItemDTO extends PickType(CartItemDTO, [
  'cartId',
] as const) {}

class NewCreateCartItemDTO extends PickType(CartItemDTO, [
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

export class CreateOneCartItemDTO extends IntersectionType(
  DefaultCreatedCartItemDTO,
  NewCreateCartItemDTO,
) {}
