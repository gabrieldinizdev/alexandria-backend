import { ApiProperty } from '@nestjs/swagger';

import { IsString, MaxLength } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class StockDTO extends CommonFieldsDTO {
  @IsString()
  @MaxLength(64)
  @ApiProperty({
    description: 'Stock name',
    example: 'Loja A',
  })
  public readonly name: string;
}
