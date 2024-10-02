import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ProductDTO } from './product.dto';

class DefaultCreatedProductDTO extends PickType(ProductDTO, [
  'title',
  'description',
  'price',
  'sku',
  'categoryId',
  'active',
] as const) {}

class NewCreateProductDTO extends PickType(ProductDTO, [
  'title',
  'active',
  'categoryId',
  'description',
  'sku',
  'price',
] as const) {
  @IsNotEmpty()
  public readonly title: string;

  @IsNotEmpty()
  public readonly active: boolean;

  @IsNotEmpty()
  public readonly categoryId: string;

  @IsNotEmpty()
  public readonly description: string;

  @IsNotEmpty()
  public readonly sku: string;

  @IsNotEmpty()
  public readonly price: number;
}

export class CreateOneProductDTO extends IntersectionType(
  DefaultCreatedProductDTO,
  NewCreateProductDTO,
) {}
