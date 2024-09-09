import { ApiProperty } from '@nestjs/swagger';

import { IsMongoId, IsNumber } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class Item extends CommonFieldsDTO {
  @ApiProperty({
    description: 'Item price',
    example: 100.0,
  })
  @IsNumber()
  public readonly price: number;

  @ApiProperty({
    description: 'Item quantity',
    example: 10,
  })
  @IsNumber()
  public readonly quantity: number;

  @ApiProperty({
    description: 'Product id',
    example: '669543757fcd695893969290',
  })
  @IsMongoId()
  public readonly productId: string;
}
