import { IntersectionType, PickType } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

import { StockDTO } from './stock.dto';

class DefaultCreatedStockDTO extends PickType(StockDTO, [
  'quantity',
  'product',
] as const) {}

class NewCreateStockDTO extends PickType(StockDTO, [
  'quantity',
  'product',
] as const) {
  @IsNotEmpty()
  public readonly quantity: number;
  @IsNotEmpty()
  public readonly product: string;
}

export class CreateStockDTO extends IntersectionType(
  DefaultCreatedStockDTO,
  NewCreateStockDTO,
) {}
