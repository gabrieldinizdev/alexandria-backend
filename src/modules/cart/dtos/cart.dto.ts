import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsMongoId, IsNumber } from 'class-validator';

import { CartItemDTO } from '@/modules/cart-item';
import { CommonFieldsDTO } from '@/shared/dtos';

export class CartDTO extends CommonFieldsDTO {
  @ApiProperty({
    description: 'Cart active',
    example: true,
  })
  @IsBoolean()
  public readonly active: boolean;

  @ApiProperty({
    description: 'Cart total',
    example: 100.0,
  })
  @IsNumber()
  public readonly total: number;

  @ApiProperty({
    description: 'Cart items',
    example: [
      {
        id: '669543757fcd695893969290',
        price: 100.0,
        quantity: 10,
        deletedAt: '2024-07-15T15:27:15.700Z',
        updatedAt: '2024-07-15T15:27:15.700Z',
        createdAt: '2024-07-15T15:27:15.700Z',
      },
    ],
  })
  public readonly items: CartItemDTO[];

  @ApiProperty({
    description: 'Cart customer id',
    example: '669543757fcd695893969290',
  })
  @IsMongoId()
  public readonly customerId: string;
}
