import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class StockDTO extends CommonFieldsDTO {
  @IsString()
  @ApiProperty({
    description: 'Stock quantity',
    example: '20',
  })
  public readonly quantity: number;

  @IsString()
  @ApiProperty({
    description: 'Stock product name',
    example: 'Café',
  })
  public readonly product: string;
}
