import { ApiProperty } from '@nestjs/swagger';

import { IsNumber } from 'class-validator';

import { CommonFieldsLinksTableDTO } from '@/shared/dto/commom-fields-in-links-table.dto';

export class ProductOnStockDTO extends CommonFieldsLinksTableDTO {
  @IsNumber()
  @ApiProperty({
    description: 'stock quantity',
    example: 50,
  })
  public readonly quantity: number;
}
