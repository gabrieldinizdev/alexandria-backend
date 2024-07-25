import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class StockDTO extends CommonFieldsDTO {
  @IsString()
  @ApiProperty({
    description: 'Stock name',
    example: 'Loja A',
  })
  name: string;
}
