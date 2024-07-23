import { ApiProperty } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';

import { CommonFieldsDTO } from '@/shared/dto';

export class ProductDTO extends CommonFieldsDTO {
  @IsString()
  @ApiProperty({
    description: 'Product sku',
    example: 'CAF-MED-250G-BR',
  })
  public readonly sku: string;

  @IsString()
  @ApiProperty({
    description: 'Product title',
    example: 'Café',
  })
  public readonly title: string;

  @IsString()
  @ApiProperty({
    description: 'Product description',
    example:
      'Descubra a essência do verdadeiro café brasileiro com o Café Especial Reserva da Fazenda. Colhido manualmente nas montanhas de Minas Gerais, este café é uma seleção cuidadosa dos melhores grãos arábica, cultivados a uma altitude de 1200 metros, o que proporciona um sabor único e inigualável.',
  })
  public readonly description: string;

  @IsPositive()
  @IsNumber()
  @ApiProperty({
    description: 'Product price',
    example: '15.90',
  })
  public readonly price: number;

  @IsBoolean()
  @ApiProperty({
    description: 'Product active',
    example: 'true',
  })
  public readonly active: boolean;

  @IsString()
  @ApiProperty({
    description: 'product category',
    example: '669ffcaddeba13289c8bb845',
  })
  public readonly categoryId: string;
}
