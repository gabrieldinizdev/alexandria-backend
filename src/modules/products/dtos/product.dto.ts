import { ApiProperty } from '@nestjs/swagger';

import {
  IsBoolean,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class ProductDTO extends CommonFieldsDTO {
  @IsString()
  @ApiProperty({
    description: 'Product title',
    example: 'O curioso caso do dhyon tratado como objeto',
  })
  public readonly title: string;

  @MaxLength(300)
  @IsString()
  @ApiProperty({
    description: 'User password',
    example: 'Descrição do produto',
  })
  public readonly description: string;

  @IsString()
  @ApiProperty({
    description: 'Image url',
    example: 'https://imagem-normal.com.br',
  })
  public readonly imageUrl: string;

  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Product Price',
    example: '10000',
  })
  public readonly price: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Active product',
    example: false,
  })
  public readonly active: boolean;
}
