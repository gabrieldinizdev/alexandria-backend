import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { ProductOnStockDTO } from './product-on-stock.dto';

class DefaultCreatedProductOnStockDTO extends PickType(ProductOnStockDTO, [
  'quantity',
] as const) {}

class NewCreateProductOnStockDTO extends PickType(ProductOnStockDTO, [
  'quantity',
] as const) {
  @IsNotEmpty()
  public readonly quantity: number;
}

export class CreateOneProductOnStockDTO extends IntersectionType(
  DefaultCreatedProductOnStockDTO,
  NewCreateProductOnStockDTO,
) {}
